rm(list=ls())

require(jsonlite)
require(leaflet)
require(stringr)

grupos <- fromJSON("http://192.168.1.43:25050/api/grupos/apariciones")

str(grupos)

apariciones_grupo <- function(apariciones) {
    unlist(apariciones)
}

grupos_apariciones <- lapply(grupos$apariciones, function(x) apariciones_grupo(x))

grupos_apariciones[unlist(lapply(grupos_apariciones, is.null))] <- "null"

apariciones <- unlist(grupos_apariciones)
apariciones[apariciones == "[object Object]"] <- "null"

lapply(apariciones, function(x) fromJSON(x))

grupos.mapas <- cbind(grupos[,c("nombre","genero")],unlist(grupos_apariciones))

colnames(grupos.mapas) <- c("nombre","genero","apariciones")

marker <- str_split(fromJSON(grupos.mapas$apariciones)$geoSitio,",")

m <- leaflet() %>%
    addTiles() %>%
        addMarkers(lng=as.numeric(marker[2]), lat=as.numeric(marker[1]), popup="The birthplace of R")

htmlwidgets::saveWidget(m, "./mapa.html")

m <- leaflet() %>%
  addTiles() %>%  # Add default OpenStreetMap map tiles
  addMarkers(lng=174.768, lat=-36.852, popup="The birthplace of R")
m  # Print the map
