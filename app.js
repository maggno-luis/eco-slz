const pontosColeta = [
  {
    nome: "EcoPonto UNDB",
    latitude: -2.4997027180768603,
    longitude: -44.28684621983799,
  },
  {
    nome: "EcoPonto UFMA",
    latitude: -2.5584420772606387,
    longitude: -44.30906121626945,
  },
  {
    nome: "EcoPonto Parque do Rangedor",
    latitude: -2.533198,
    longitude: -44.2979,
  },
  {
    nome: "EcoPonto Parque do Bom Menino",
    latitude: -2.4985929061347005,
    longitude: -44.261526982756315,
  },
  {
    nome: "Loja Vivo",
    latitude: -2.50644537211267,
    longitude: -44.29588996070613,
  },
  {
    nome: "Magazine Luiza",
    latitude: -2.504284183970194,
    longitude: -44.26809860166469,
  },
];

const map = L.map("map").setView([-2.529, -44.2979], 13);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

pontosColeta.forEach((ponto) => {
  L.marker([ponto.latitude, ponto.longitude]).addTo(map).bindPopup(`
                    <b>${ponto.nome}</b><br>
                `);
});

let userMarker = null;
const statusElement = document.getElementById("locationStatus");

function getUserLocation() {
  statusElement.textContent = "Buscando sua localização...";

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        statusElement.textContent = `Localização encontrada! (${lat.toFixed(
          5
        )}, ${lon.toFixed(5)})`;

        if (userMarker) map.removeLayer(userMarker);

        map.setView([lat, lon], 14);

        userMarker = L.marker([lat, lon], {
          icon: L.icon({
            iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
            iconSize: [32, 32],
            iconAnchor: [16, 32],
          }),
        })
          .addTo(map)
          .bindPopup("Sua localização atual")
          .openPopup();
      },
      (error) => {
        let message = "Erro ao obter localização: ";
        switch (error.code) {
          case error.PERMISSION_DENIED:
            message += "Permissão negada pelo usuário";
            break;
          case error.POSITION_UNAVAILABLE:
            message += "Localização indisponível";
            break;
          case error.TIMEOUT:
            message += "Tempo de requisição excedido";
            break;
          default:
            message += "Erro desconhecido";
        }
        statusElement.textContent = message;
      }
    );
  } else {
    statusElement.textContent = "Seu navegador não suporta geolocalização";
  }
}

window.onload = getUserLocation;
