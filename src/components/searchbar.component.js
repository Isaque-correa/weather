import { useNavigate } from "react-router-dom";
import { geolocation } from "../services/geolocation.service";

function SearchBar() {
  let navigate = useNavigate();
  const search = (form) => {
    let cityName = form.target.elements.city.value;
    navigate(`/clima?city=${cityName}`);
  };
  const location = () => {
    const _geo = geolocation(function (position) {
      if (position != undefined) {
        navigate(
          `/clima?geo=true&lat=${position.coords.latitude}&lng=${position.coords.longitude}`
        );
      }
    });
  };
  return (
    <form onSubmit={search} className="weather__form">
      <input
        name="city"
        type="text"
        placeholder="Digite sua Cidade"
        className="city"
        required
      />
      <div className="location">
        <button type="submit" value="Enviar" className="btn btn-primary">
          Verificar o clima
        </button>
        <button type="button" onClick={location}>
          Obter localização
        </button>
      </div>
    </form>
  );
}

export default SearchBar;
