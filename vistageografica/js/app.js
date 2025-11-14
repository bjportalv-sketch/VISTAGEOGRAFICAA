const map = L.map('map').setView([-12.046374, -77.042793], 12);

const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

let parcelasLayer = L.geoJSON(null, {
  style: ()=>({ color:'#3388ff', weight:1, fillOpacity:0.4 }),
  onEachFeature: (feature, layer)=>{
    let p = feature.properties || {};
    layer.bindPopup(`<b>ID:</b> ${p.id||'N/A'}<br><b>Área:</b> ${p.area||'N/A'}`);
  }
}).addTo(map);

fetch('data/parcelas.geojson')
  .then(r=>r.json())
  .then(g=>{
    parcelasLayer.addData(g);
    map.fitBounds(parcelasLayer.getBounds());
  });

document.getElementById('toggleParcelas').addEventListener('change', e=>{
  if(e.target.checked) map.addLayer(parcelasLayer);
  else map.removeLayer(parcelasLayer);
});
