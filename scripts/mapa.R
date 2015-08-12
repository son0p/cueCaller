rm(list=ls())

require(jsonlite)
require(leaflet)
require(stringr)

grupos <- fromJSON("http://cuecaller.son0p.net/api/grupos/apariciones")

## Para ver la estructura del objeto
str(grupos)

## Para ver los nombres del contenido del objeto, que puede ser columnas u otros objetos
names(grupos) # Corresponden con los nombres y el índice

## Para acceder a los elementos de un objeto se puede usar $masnombredecolumna
grupos[1:2,c(20,12)]

grupos[1:2,c("nombre","facebook")]

# Para ver la longitud se usa length
length(grupos[1:2,c("nombre","facebook")])

length(grupos[1:20,c("nombre","facebook")])

length(grupos[1:20,c("nombre")])

grupos$`nombre con espacios y tíldes` #Para poder acceder a columnas con se usan las tildes invertidas

## Si no pongo nada en el campo de col o row se trae todo lo que hay
apariciones <- grupos[,c("nombre","apariciones")]
str(apariciones)

## lapply permite aplicar una función a una lista
apariciones$apariciones[unlist(lapply(apariciones$apariciones, is.null))] <- "null"

apariciones_ev <- unlist(apariciones$apariciones)

########################
## Generar mapa a partir de los archivos de geojson en el repositorio github.com/son0p/mapasGrupos
########################
masacre <- fromJSON("https://raw.githubusercontent.com/son0p/mapasGrupos/master/masacre.geojson")

## http://rstudio.github.io/leaflet/json.html
m <- leaflet() %>%
    addProviderTiles("Stamen.Toner") %>%
    addGeoJSON(toJSON(masacre))
m  # Print the map

htmlwidgets::saveWidget(m, "./mapa.html")
