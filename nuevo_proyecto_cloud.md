# DOCUMENTACIÓN ESTRUCTURA NOMBRES OBJETOS GENESYS CLOUD
    
 **CONTROL DE CAMBIOS**

|Versión           | Fecha   | Descripción| Responsable |Cargo    |
|:----             |:----    |:----       |:----        |:----    |
|1 |09/06/2023 |Documentación inicial |Daniel Felipe Romero Mesa  |INGENIERO BI|
|2 |22/06/2023| Se adiciona estructura para VoiceBot, ChatBot y WhatsappBot| Daniel Felipe Romero Mesa Maria Jennifer Montoya Yasmin Restrepo |INGENIERO BI LIDER DE CIENCIA DE DAROS Y ANALITICA COORDINADORA DE BI Y REPORTES|
|3 |28/06/2023| Se adicionan estructura de los custom para las encuestas. |Daniel Felipe Romero Mesa| INGENIERO BI|
|4| 27/07/2023 |Se adiciona estandarización para los flujos de Bot desarrollados por medio de Apify |Daniel Felipe Romero Mesa |INGENIERO BI|


Se comparte la estructura que deben de llevar cada uno de los objetos creados en la plataforma de Genesys Cloud, sea grupo, IVR, campañas entre otros.

Se debe de conservar siempre el prefijo del cliente al inicio de la estructura para determinar por parte del proceso de reportes y facturación a que cliente pertenece dicho objeto.

>La estructura es:
- **Grupos de atención:** PREFIJOCLIENTE_NOMBRE_CANAL_01 (Máximo 50 caracteres) en donde el canal puede ser:
    - Entrada: IN
    - Salida: OUT
    - Chat: CHAT
    - Digital: WEBCHAT (Whatsapp, Mail) 

#### Ejemplo: ESSA_SAC_IN_01

- **IVR:** PREFIJOCLIENTE_IVR_NOMBRE (si es de encuesta se incluye en el nombre la palabra ENCUESTA) (Máximo 50 caracteres)
#### Ejemplo IVR: CMV_IVR_ENCUESTASAC

- **VoiceBot:** PREFIJOCLIENTE_VBOT_NOMBRE (si es de encuesta se incluye en el nombre la palabra ENCUESTA) (Máximo 50 caracteres)
#### Ejemplo: CMV_ VBOT _LILI

- **ChatBot:** PREFIJOCLIENTE_CBOT_NOMBRE (si es de encuesta se incluye en el nombre la palabra ENCUESTA) (Máximo 50 caracteres)
#### Ejemplo: CENS_ CBOT _SAC

- **WhatsappBot:** PREFIJOCLIENTE_WBOT_NOMBRE (si es de encuesta se incluye en el nombre la palabra ENCUESTA) (Máximo 50 caracteres)
#### Ejemplo: CENS_ WBOT _SAC

- **Campañas:** PREFIJOCLIENTE_NOMBRE_OUT_01 (Máximo 32 caracteres)
#### Ejemplo: ESSA_ESCRITO_OUT_01

**NOTA:** Ninguno de los nombres deben de llevar espacios.

La información de los prefijos de los clientes esta disponible en reportes Emtelco en la siguiente ruta:
 [Prefijo_Clientes](https://web.emtelco.co/Reportes/report/PROGRAMACIÓN%20Y%20CONTROL/Clientes/01_Prefijo_Clientes)

 Tener claro y presente que esto aplica para todas las campañas independiente del tipo que sean, progresiva, de agente, sin agente entre otras.

 En la creación de las campañas en el administrador de campañas de Gensys Cloud en los campos “`Nombre campaña`” y “`ID de llamada: nombre`” deben de ser los mismos, en lo posible tratar de que el limite sea de 32 caracteres. Si supera este límite se nos debe de informar por medio de correo y ticket a la cola de soporte aplicaciones y posterior a la cola de facturación para darles un tratamiento diferente y pasen al proceso sin novedades.

 ![](../assets/uploads/ImagenCampana1.jpg)

 ![](../assets/uploads/ImagenCampana2.jpg)

 Estructura custom:
 >|Código;descripción;valor

Estructura traza opciones: 
>|Código;descripción;DuraciónMilisegundos

Custom reservados nivel compañia:
- SPD_Custom1: Nombre
- SPD_Custom2: Documento
- SPD_Custom3: CodigoFamiliar (Solo para TIGOUNE)
- SPD_Custom10: SegmentoCliente (Solo para TIGOUNE)

**Flujo IVR:**

En cada desarrollo de flujo con trazas opciones se debe de dejar en la manual del área del IVR las opciones con su respectiva clasificación, cliente, nombre IVR y tiempoFacturable en caso de que aplique.

**Flujo Bot:**

Para los desarrollos de flujos de Bot en Apify se debe de marcar por medio del custom30 de la siguiente manera, para identificar desde el proceso de BI a qué tipo de flujo corresponde la interacción, debido de que este tipo de desarrollos quedan todos marcados con tipo de medio “Message” independiente del medio digital de atención `(Facebook, Whatsapp, Instagram, WebChat)`:

 SPD_Custom30: 
>|Código;TIPO_CAMPANA;NombreFlujo

**NOTA:**
Adicional desde el desarrollo se debe de garantizar el transcript de la conversación para efectos de reportería, se deben de almacenar en una BD de BI por medio de los Lambda, para efectos de entendimiento de realiza como piloto la implementación de esto con el cliente CENS.

Para los desarrollos en IVR entre los atributos del participante registra el trazado de los flujos que presento la interacción y debe de guardarse bajo la variable APP.

 ![](../assets/uploads/ImagenCustom.jpg)

Se estandariza las contactList de las campañas la cual se encuentra en el adjunto.[Link](../assets/uploads/ESTRUCTURA_NOMBRES_OBJETOS_GENESYS_CLOUD.xlsx)



