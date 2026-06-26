/**
 * ! Patrón Facade
 * Este patrón proporciona una interfaz unificada para un conjunto de interfaces
 * en un subsistema.
 *
 * Facade define una interfaz de nivel más alto que hace que el subsistema
 * sea más fácil de usar.
 *
 * * Es útil cuando un subsistema es complejo o difícil de entender para
 * * proporcionar una interfaz simplificada para el cliente.
 *
 * https://refactoring.guru/es/design-patterns/facade
 */

import { COLORS } from "../helpers/colors.ts";

class Projector {
    TurnOn() {
        console.log('Proyector encendido');
    }
    TurnOff() {
        console.log('Proyector apagado');
    }
}

class SoundSystem {
    on() {
        console.log('Sistema de sonido encendido');
    }
    off() {
        console.log('Sistema de sonido apagado');
    }
}

class VideoPlayer {
    on() {
        console.log('Reproductor de video encendido');
    }
    off() {
        console.log('Reproductor de video apagado');
    }

    play(movie: string) {
        console.log(`Reproduciendo película: ${movie}`);
    }
    stop() {
        console.log('Deteniendo reproducción de película');
    }
}

class PopcornMaker {
    popingPorcorn() {
        console.log('Haciendo palomitas de maíz');
    }
    stopPopingPorcorn() {
        console.log('Deteniendo palomitas de maíz');
    }
}

interface HomeTheaterFacadeProps {
    projector: Projector;
    soundSystem: SoundSystem;
    videoPlayer: VideoPlayer;
    popcornMaker: PopcornMaker;
}

class HomeTheaterFacade {
    private projector: Projector;
    private soundSystem: SoundSystem;
    private videoPlayer: VideoPlayer;
    private popcornMaker: PopcornMaker;

    constructor({
        projector,
        soundSystem,
        videoPlayer,
        popcornMaker
    }: HomeTheaterFacadeProps) {
        this.projector = projector;
        this.soundSystem = soundSystem;
        this.videoPlayer = videoPlayer;
        this.popcornMaker = popcornMaker;
    }

    watchMovie(movie: string): void {
        console.log('%cPreparando para ver la pelicula', COLORS.blue);
        this.projector.TurnOn();
        this.soundSystem.on();
        this.popcornMaker.popingPorcorn();
        this.videoPlayer.on();
        this.videoPlayer.play(movie);
        console.log('%cDisfrute de la película', COLORS.blue);
    }

    endMovie(): void {
        console.log('%cPreparando para detener la pelicula', COLORS.blue);
        this.projector.TurnOff();
        this.soundSystem.off();
        this.popcornMaker.stopPopingPorcorn();
        this.videoPlayer.stop();
        this.videoPlayer.off();
    }
}

function main() {
    const homeTheater = new HomeTheaterFacade({
        projector: new Projector(),
        soundSystem: new SoundSystem(),
        videoPlayer: new VideoPlayer(),
        popcornMaker: new PopcornMaker()
    });
    homeTheater.watchMovie('The Matrix');
    homeTheater.endMovie();
}

main()
