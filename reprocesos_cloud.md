# Reprocesos Cloud

1. Se deben truncar todas las tablas a usar 
```plsql
TRUNCATE TABLE CloudApi_Tbl_Attributes
TRUNCATE TABLE [dbo].[ReprocesoAtributos]
TRUNCATE TABLE [dbo].[CloudApi_Tbl_Rechazos_attribut]
```

2. Cargar la tabla con los callid que se deben reprocesar (se debe cambiar la fecha para el dia que se desea reprocesar)

	a. Encuestas
```plsql
INSERT INTO [dbo].[ReprocesoAtributos] (organizacion, idtransaccion)
SELECT organizacion, GenesysKey
FROM [10.2.1.94].[DwhOperacion].[dbo].[HLlamadasCloudEncuestas]
WHERE ((fechaHoraInicio >= '2023-04-13' AND fechaHoraInicio <= '2023-04-13 23:59:59.999') OR (FechaFinal >= '2023-04-13' AND FechaFinal <= '2023-04-13 23:59:59.999'))
AND Pregunta1 IS NULL AND Pregunta2 IS NULL AND Pregunta3 IS NULL AND Pregunta4 IS NULL AND Pregunta5 IS NULL AND Pregunta6 IS NULL AND Pregunta7 IS NULL AND 
Pregunta8 IS NULL AND Pregunta9 IS NULL AND Pregunta10 IS NULL AND Pregunta11 IS NULL AND Pregunta12 IS NULL AND Pregunta13 IS NULL 
```
	b. Atributos
```plsql
INSERT INTO [dbo].[ReprocesoAtributos] (organizacion, idtransaccion)
SELECT organizacion, idTransaccion
FROM [10.2.1.94].[DwhOperacion].[dbo].[TBL_ReporteInteraccionesIVRDetail]
WHERE ((fechaHoraIngreso >= '2023-04-13' AND fechaHoraIngreso <= '2023-04-13 23:59:59.999') OR (fechaHoraFin >= '2023-04-13' AND fechaHoraFin <= '2023-04-13 23:59:59.999'))
AND opcionesNavegacionTrazaOpciones IS NULL
```

3. Se corre el job 
```plsql
Diario01_Job_Extraccion_Atributos_Reproceso 
```
4. Se corre el sp Nota: `No necesita fecha ni nada`
```plsql
EXECUTE [Cargar_ReprocesoAtributosResultado] 
```

5. Se debe correr el update en el 94 (se debe cambiar la fecha para el dia que se desea reprocesar)

		a. Encuestas 
```plsql
UPDATE R
SET  R.Pregunta1 = I.SPDEncuestaRespuesta1, R.Pregunta2 = I.SPDEncuestaRespuesta2,R.Pregunta3 = I.SPDEncuestaRespuesta3 ,R.Pregunta4 = I.SPDEncuestaRespuesta4, R.Pregunta5 = I.SPDEncuestaRespuesta5,R.Pregunta6 = I.SPDEncuestaRespuesta6, R.Pregunta7 = I.SPDEncuestaRespuesta7, R.Pregunta8 = I.SPDEncuestaRespuesta8, R.Pregunta9 = I.SPDEncuestaRespuesta9,
R.Pregunta10 = I.SPDEncuestaRespuesta10
--SELECT *
FROM [dbo].[HLlamadasCloudEncuestas] R
INNER JOIN [EC2-INTERAXA].[DB_Staging_Api_GC].[dbo].[ReprocesoAtributosResultado] I ON R.GenesysKey = I.IdTransaccion
WHERE ((r.fechaHoraInicio >= '2023-04-02' AND r.fechaHoraInicio <= '2023-04-03 23:59:59.999') OR (r.FechaFinal >= '2023-04-02' AND r.FechaFinal <= '2023-04-03 23:59:59.999'))
```
		b. Atributo
```plsql
UPDATE R
SET  R.OpcionesNavegacionTrazaOpciones = I.OpcionesNavegacionTrazaOpciones, R.UltimaOpcion = I.UltimaOpcion,R.tipoTransaccionUltimaOpcion = I.TipoTransaccion,
R.Custom1 =I.Custom1,R.Custom2 = I.Custom2,R.Custom3 = I.Custom3,R.Custom4 = I.Custom4,R.Custom5 =I.Custom5,R.Custom6 = I.Custom6,R.Custom7 = I.Custom7,R.Custom8 = I.Custom8,R.Custom9 = I.Custom9
,R.Custom10 = I.Custom10,R.Custom11 = I.Custom11,R.Custom12 = I.Custom12,R.Custom13 = I.Custom13,R.Custom14 = I.Custom14 ,R.Custom15 = I.Custom15 ,R.Custom16 = I.Custom16,R.Custom17 = I.Custom17
,R.Custom18 = I.Custom18,R.Custom19 = I.Custom19,R.Custom20 = I.Custom20,R.Custom21 = I.Custom21,R.Custom22 = I.Custom22,R.Custom23 = I.Custom23,R.Custom24 = I.Custom24,R.Custom25 = I.Custom25
,R.Custom26 = I.Custom26,R.Custom27 = I.Custom27,R.Custom28 = I.Custom28,R.Custom29 = I.Custom29,R.Custom30 = I.Custom30,R.Custom31 = I.Custom31,R.Custom32 = I.Custom32,R.Custom33 = I.Custom33
,R.Custom34 = I.Custom34,R.Custom35 = I.Custom35,R.Custom36 = I.Custom36,R.Custom37 = I.Custom37,R.Custom38 = I.Custom38,R.Custom39 = I.Custom39,R.SPD_custom39 = I.SPD_custom39,R.Custom40 = I.Custom40
,R.Custom41 = I.Custom41,R.Custom42 = I.Custom42,R.Custom43 = I.Custom43,R.Custom44 = I.Custom44,R.Custom45 = I.Custom45,R.Custom46 = I.Custom46,R.Custom47 = I.Custom47,R.Custom48 = I.Custom48
,R.Custom49 = I.Custom49,R.Custom50 = I.Custom50
--SELECT *
FROM [dbo].[TBL_ReporteInteraccionesIVRDetail] R
INNER JOIN [EC2-INTERAXA].[DB_Staging_Api_GC].[dbo].[ReprocesoAtributosResultado] I ON R.IdTransaccion = I.IdTransaccion
WHERE ((R.fechaHoraIngreso >= '2023-04-13' AND R.fechaHoraIngreso <= '2023-04-13 23:59:59.999') OR (R.fechaHoraFin >= '2023-04-13' AND R.fechaHoraFin <= '2023-04-13 23:59:59.999'))
```
