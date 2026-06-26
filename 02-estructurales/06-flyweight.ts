/**
 * ! Patrón Flyweight
 * Es un patrón de diseño estructural que nos permite usar objetos compartidos
 * para soportar eficientemente grandes cantidades de objetos.
 *
 * * Es útil cuando necesitamos una gran cantidad de objetos y queremos reducir
 * * la cantidad de memoria que utilizan.
 *
 * https://refactoring.guru/es/design-patterns/flyweight
 */
import { COLORS } from "../helpers/colors.ts";

interface Location {
    display(coordinates: { x: number; y: number }): void;
}

//flyweight
class LocationIcon implements Location {
    private type: string;
    private iconImage: string;

    constructor(
        type: string,
        iconImage: string
    ) {
        this.type = type;
        this.iconImage = iconImage;
    }

    display(coordinates: { x: number; y: number }): void {
        console.log(
            `
            Coordinates: (${coordinates.x}, ${coordinates.y})
            LocationType: ${this.type}
            Icon: ${this.iconImage}
            `
        );
    }
}

//fabrica de fleyweight

class LocationIconFactory {
    private icon: Record<string, LocationIcon> = {};// {'hostpital': { type: 'Hospital', iconImage: 'imagen_del_hospital.png' } }
    getLocationIcon(type: string): LocationIcon {
        
        if (!this.icon[type]) {
            console.log(`Creando una nueva instancia del ícono ${type}`);
            const iconImage = `imagen_del_${type.toLocaleLowerCase()}.png`;
            this.icon[type] = new LocationIcon(type, iconImage);
        }
        return this.icon[type];
    }
    showIcons() {
        console.log("Iconos creados:");
        for (const type in this.icon) {
            console.log(`- ${type}`);
        }
    }
}

class MapLocation {
    private coordinates: { x: number; y: number };
    private icon: LocationIcon;

    constructor(
        coordinates: { x: number; y: number },
        icon: LocationIcon
    ) {
        this.coordinates = coordinates;
        this.icon = icon;
    }

    display() {
        this.icon.display(this.coordinates);
    }
}
function main() {
    const factory = new LocationIconFactory();
    const locations = [
        new MapLocation({ x: 10, y: 20 }, factory.getLocationIcon("Hospital")),
        new MapLocation({ x: 15, y: 25 }, factory.getLocationIcon("Hospital")),
        new MapLocation({ x: 35, y: 35 }, factory.getLocationIcon("Hospital")),

        new MapLocation({ x: 35, y: 35 }, factory.getLocationIcon("Parque")),
        new MapLocation({ x: 35, y: 35 }, factory.getLocationIcon("Parque")),

    ]

    locations.forEach((location) => location.display());
    factory.showIcons();
}

main();