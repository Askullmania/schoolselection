////////////////////////////////////////////////////
/////////////// Abstracting API calls //////////////
//(for maybe an extension to another map provider)//
//////////////////mocks created/////////////////////
// http://wiki.openstreetmap.org/wiki/OpenLayers
// http://openlayers.org/dev/examples
//http://docs.openlayers.org/contents.html
Gmaps4Rails.openMarkers=null,Gmaps4Rails.markersLayer=null,Gmaps4Rails.markersControl=null,Gmaps4Rails.createPoint=function(a,b){},Gmaps4Rails.createLatLng=function(a,b){return(new OpenLayers.LonLat(b,a)).transform(new OpenLayers.Projection("EPSG:4326"),new OpenLayers.Projection("EPSG:900913"))},Gmaps4Rails.createAnchor=function(a){return a===null?null:new OpenLayers.Pixel(a[0],a[1])},Gmaps4Rails.createSize=function(a,b){return new OpenLayers.Size(a,b)},Gmaps4Rails.createLatLngBounds=function(){return new OpenLayers.Bounds},Gmaps4Rails.createMap=function(){var a=new OpenLayers.Map(Gmaps4Rails.map_options.id);return a.addLayer(new OpenLayers.Layer.OSM),a.setCenter(Gmaps4Rails.createLatLng(Gmaps4Rails.map_options.center_latitude,Gmaps4Rails.map_options.center_longitude),Gmaps4Rails.map_options.zoom),a},Gmaps4Rails.createMarker=function(a){var b=OpenLayers.Util.extend({},OpenLayers.Feature.Vector.style["default"]);b.fillOpacity=1,Gmaps4Rails.markersLayer===null&&(Gmaps4Rails.markersLayer=new OpenLayers.Layer.Vector("Markers",null),Gmaps4Rails.map.addLayer(Gmaps4Rails.markersLayer),Gmaps4Rails.markersLayer.events.register("featureselected",Gmaps4Rails.markersLayer,Gmaps4Rails.onFeatureSelect),Gmaps4Rails.markersLayer.events.register("featureunselected",Gmaps4Rails.markersLayer,Gmaps4Rails.onFeatureUnselect),Gmaps4Rails.markersControl=new OpenLayers.Control.SelectFeature(Gmaps4Rails.markersLayer),Gmaps4Rails.map.addControl(Gmaps4Rails.markersControl),Gmaps4Rails.markersControl.activate()),a.marker_picture===""?(b.graphicHeight=30,b.externalGraphic="http://openlayers.org/dev/img/marker-blue.png"):(b.graphicWidth=a.marker_width,b.graphicHeight=a.marker_height,b.externalGraphic=a.marker_picture,a.marker_anchor!==null&&(b.graphicXOffset=a.marker_anchor[0],b.graphicYOffset=a.marker_anchor[1]),a.shadow_picture!==""&&(b.backgroundGraphic=a.shadow_picture,b.backgroundWidth=a.shadow_width,b.backgroundHeight=a.shadow_height,a.shadow_anchor!==null&&(b.backgroundXOffset=a.shadow_anchor[0],b.backgroundYOffset=a.shadow_anchor[1]))),b.graphicTitle=a.title;var c=new OpenLayers.Feature.Vector(new OpenLayers.Geometry.Point(a.Lng,a.Lat),null,b);return c.geometry.transform(new OpenLayers.Projection("EPSG:4326"),new OpenLayers.Projection("EPSG:900913")),Gmaps4Rails.markersLayer.addFeatures([c]),c},Gmaps4Rails.clearMarkers=function(){Gmaps4Rails.clearMarkersLayerIfExists(),Gmaps4Rails.markersLayer=null,Gmaps4Rails.boundsObject=new OpenLayers.Bounds},Gmaps4Rails.clearMarkersLayerIfExists=function(){Gmaps4Rails.markersLayer!==null&&Gmaps4Rails.map.getLayer(Gmaps4Rails.markersLayer.id)!==null&&Gmaps4Rails.map.removeLayer(Gmaps4Rails.markersLayer)},Gmaps4Rails.extendBoundsWithMarkers=function(){for(var a=0;a<this.markers.length;++a)Gmaps4Rails.boundsObject.extend(Gmaps4Rails.createLatLng(Gmaps4Rails.markers[a].lat,Gmaps4Rails.markers[a].lng))},Gmaps4Rails.createClusterer=function(a){var b=new OpenLayers.Style({pointRadius:"${radius}",fillColor:"#ffcc66",fillOpacity:.8,strokeColor:"#cc6633",strokeWidth:"${width}",strokeOpacity:.8},{context:{width:function(a){return a.cluster?2:1},radius:function(a){var b=2;return a.cluster&&(b=Math.min(a.attributes.count,7)+2),b}}}),c=new OpenLayers.Strategy.Cluster,d=new OpenLayers.Layer.Vector("Clusters",{strategies:[c],styleMap:new OpenLayers.StyleMap({"default":b,select:{fillColor:"#8aeeef",strokeColor:"#32a8a9"}})});return Gmaps4Rails.clearMarkersLayerIfExists(),Gmaps4Rails.map.addLayer(d),d.addFeatures(a),d},Gmaps4Rails.clusterize=function(){if(this.markers_conf.do_clustering===!0){this.markerClusterer!==null&&this.clearClusterer();var a=[];for(var b=0;b<this.markers.length;++b)a.push(this.markers[b].serviceObject);this.markerClusterer=Gmaps4Rails.createClusterer(a)}},Gmaps4Rails.clearClusterer=function(){Gmaps4Rails.map.removeLayer(Gmaps4Rails.markerClusterer)},Gmaps4Rails.createInfoWindow=function(a){var b;Gmaps4Rails.exists(a.description)&&(a.serviceObject.infoWindow=a.description)},Gmaps4Rails.onPopupClose=function(a){Gmaps4Rails.markersControl.unselect(this.feature)},Gmaps4Rails.onFeatureSelect=function(a){var b=a.feature,c=new OpenLayers.Popup.FramedCloud("featurePopup",b.geometry.getBounds().getCenterLonLat(),new OpenLayers.Size(300,200),b.infoWindow,null,!0,Gmaps4Rails.onPopupClose);b.popup=c,c.feature=b,Gmaps4Rails.map.addPopup(c)},Gmaps4Rails.onFeatureUnselect=function(a){var b=a.feature;b.popup&&(Gmaps4Rails.map.removePopup(b.popup),b.popup.destroy(),b.popup=null)},Gmaps4Rails.fitBounds=function(){Gmaps4Rails.map.zoomToExtent(Gmaps4Rails.boundsObject,!0)},Gmaps4Rails.centerMapOnUser=function(){Gmaps4Rails.map.setCenter(Gmaps4Rails.userLocation)}