{
    const plugin = (props) => (hook) => {

        function unique_id_generator() {
            return Math.floor((Math.random() + 1) * 65536).toString(16).substring(1);
        }

        function datesArray(start, end) {
            let result = [], current = new Date(start);
            while (current <= end)
                result.push(current) && (current = new Date(current)) && current.setDate(current.getDate() + 1);
            return result;
        }

        // Invoked one time when docsify script is initialized
        hook.init(() => {
        });

        // Invoked one time when the docsify instance has mounted on the DOM
        hook.mounted(() => {
        });

        // Invoked on each page load before new markdown is transformed to HTML.
        // Supports asynchronous tasks (see beforeEach documentation for details).
        hook.beforeEach(markdown => {
            return markdown;
        });

        // Invoked on each page load after new markdown has been transformed to HTML.
        // Supports asynchronous tasks (see afterEach documentation for details).
        hook.afterEach((html, next) => {
            // We load the HTML inside a DOM node to allow for manipulation
            const htmlElement = document.createElement('div');
            htmlElement.innerHTML = html;

            htmlElement.querySelectorAll('pre[data-lang=calendar]').forEach((element) => {

                const data = element.innerText;
                const calendarId = "markdown_calendar_" + unique_id_generator().toString();

                var container_list = [];
                if (localStorage.getItem('calendar_container_list')) {
                    container_list = JSON.parse(localStorage.getItem('calendar_container_list'));
                }
                container_list.push({"calendar_data": data, "div_id": calendarId});
                localStorage.setItem('calendar_container_list', JSON.stringify(container_list));

                const replacement = document.createElement('div');
                replacement.classList.add('calendar-container');
                replacement.id = calendarId + '_container';

                const calendar = document.createElement('div');
                calendar.textContent = element.textContent;
                calendar.classList.add('calendar');
                calendar.id = calendarId

                const description = document.createElement('div');
                description.classList.add('calendar-description');
                description.id = calendarId + '_description';

                replacement.appendChild(calendar);
                replacement.appendChild(description);

                // Replace
                element.parentNode.replaceChild(replacement, element);
            });

            next(htmlElement.innerHTML);
        });

        // Invoked on each page load after new HTML has been appended to the DOM
        hook.doneEach(() => {
            var style = document.createElement('style');
            style.type = 'text/css';

            style.innerHTML += '.calendar-blockquote { color: inherit !important; margin: 0.5em !important; padding-left: 10px !important; }';

            if (localStorage.getItem('calendar_container_list')) {
                container_list = JSON.parse(localStorage.getItem('calendar_container_list'));
                localStorage.removeItem('calendar_container_list');
                if (container_list) {
                    container_list.forEach(function (container) {

                        const result = container['calendar_data'].split(/\r?\n/);
                        popupList = {};
                        personList = {};
                        var textToday = "";

                        var filtered = result.filter(function (el) {
                            return el != null && el.trim()!=="";
                        });

                        filtered.forEach(function callback(value, index) {
                            if (index === 0) {
                                textToday = value;
                            } else {
                                const iterData = value.split('|');

                                const datesForPerson = datesArray(
                                    new Date(iterData.at(0).trim()),
                                    new Date(iterData.at(1).trim())
                                );

                                const classColor = 'color-' + unique_id_generator();

                                const colors = iterData.at(2).split(",");
                                style.innerHTML += '.' + classColor + ' { color: ' + colors.at(1) + ' !important;' +
                                    'background-color: ' + colors.at(0) + ' !important; }';

                                style.innerHTML += '.' + classColor + '-description { border-left: 4px solid ' + colors.at(0) + ' !important;}';

                                personList[(iterData.at(3).trim().trim())] = classColor + '-description';

                                datesForPerson.forEach(function callback(value, index) {
                                    popupList[value.toISOString().slice(0, 10)] = {
                                        modifier: classColor,
                                        html: `<div><u><b>Disponible:</b></u>
                                            <p style="margin: 5px 0 0;">` + iterData.at(3).trim() + `</p>
                                            </div>`,
                                    }
                                });
                            }
                        });

                        const description = document.getElementById(container['div_id'] + '_description');

                        Object.keys(personList).forEach(key => {
                            const personContainer = document.createElement('blockquote');
                            personContainer.textContent = key;
                            personContainer.classList.add('calendar-blockquote', personList[key])
                            description.appendChild(personContainer);
                        });

                        const options = {
                            settings: props,
                            date: {
                                today: new Date(textToday),
                            },
                            popups: popupList
                        };

                        const calendar = new VanillaCalendar("#" + container['div_id'], options);
                        calendar.init();
                    });
                }
            }
            document.getElementsByTagName('head')[0].appendChild(style);
        });

        // Invoked one time after rendering the initial page
        hook.ready(() => {
        });
    }

    const props = window.$docsify.calendarConfig || {
        lang: 'es-EN', // Austrian-German
        selection: {
            day: false,
            month: false,
            year: false,
        },
    };

    // Add plugin to docsify's plugin array
    window.$docsify = window.$docsify || {};
    $docsify.plugins = [plugin(props), ...($docsify.plugins || [])];
}