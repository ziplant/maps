import { ref } from '@vue/composition-api';
import useCoords from './coords';

export default function useMap() {
  const { coords } = useCoords();

  // eslint-disable-next-line no-undef
  const maps = ymaps;
  let myMap = null;
  let area = null;
  let areaDots = null;
  let route = null;
  let line = null;
  const address = ref('');

  const setAddress = (placeCoords) => {
    maps.geocode(placeCoords).then((res) => {
      const names = [];

      res.geoObjects.each((obj) => {
        names.push(obj.properties.get('name'));
      });

      address.value = names.join(', ');
    });
  };

  const createRoute = (placeCoords) => {
    const closestDot = areaDots.getClosestTo(placeCoords);

    myMap.geoObjects.remove(route);

    route = new maps.multiRouter.MultiRoute({
      referencePoints: [
        placeCoords,
        closestDot,
      ],
      params: {
        results: 1,
      },
    });

    myMap.geoObjects.add(route);

    myMap.geoObjects.remove(line);

    line = new maps.Polyline([
      placeCoords,
      closestDot.geometry.getCoordinates(),
    ], {
      hintContent: 'Маршрут по воздуху',
    }, {
      draggable: true,
      strokeColor: '#0bbc79',
      strokeWidth: 4,
      strokeStyle: '1 5',
    });

    myMap.geoObjects.add(line);
  };

  const selectPlace = (e) => {
    coords.markerCoords = e.get('coords');

    createRoute(coords.markerCoords);
    setAddress(coords.markerCoords);
  };

  const createMap = () => {
    myMap = new maps.Map('map', {
      center: [55.76, 37.64],
      zoom: 9,
    });

    myMap.events.add('click', selectPlace);
  };

  const createArea = () => {
    area = new maps.Polygon(coords.areaCoords);

    myMap.geoObjects.add(area);

    const areaPlacemarks = [];

    coords.areaCoords[0].forEach((dot) => {
      areaPlacemarks.push(new maps.Placemark(dot));
    });

    areaDots = maps.geoQuery(areaPlacemarks).addToMap(myMap).setOptions('visible', false);
  };

  return {
    maps,
    myMap,
    area,
    areaDots,
    route,
    line,
    address,
    setAddress,
    createRoute,
    selectPlace,
    createMap,
    createArea,
  };
}
