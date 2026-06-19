/**
 * ! Singleton:
 * Es un patrón de diseño creacional que garantiza que una clase
 * tenga una única instancia y proporciona un punto de acceso global a ella.
 *
 * * Es útil cuando necesitas controlar el acceso a una única instancia
 * * de una clase, como por ejemplo, en un objeto de base de datos o en un
 * * objeto de configuración.
 *
 * https://refactoring.guru/es/design-patterns/singleton
 */
import { COLORS } from '../helpers/colors.ts';
class DragonBalls {
    private static instance: DragonBalls;
    private ballsCollected: number;

    private constructor() {
        this.ballsCollected = 0;
    }

    public static getInstance(): DragonBalls {
        if (!DragonBalls.instance) {
            DragonBalls.instance = new DragonBalls();
            console.log('%cLas esferas del Dragón han sido creadas!', COLORS.blue);
        }
        return DragonBalls.instance;
    }

    collectBall() {
        if (this.ballsCollected < 7) {
            this.ballsCollected++;
            console.log(`Has recogido una esfera del Dragón. Total: ${this.ballsCollected}`);
        } else {
            console.log('Ya se recolectaron las 7 esferas del dragón! invoca a Shenlong');
        }
    }

    summonShenlong() {
        if (this.ballsCollected === 7) {
            console.log('¡Shenlong ha sido invocado! Pide tu deseo.');
            this.ballsCollected = 0; // Reinicia la colección de esferas después de invocar a Shenlong
            return;
        } else {
            console.log(`Aún necesitas recolectar ${7 - this.ballsCollected} esferas del Dragón más para invocar a Shenlong.`);
        }
    }
}
function main() {
    const gokuDragonBalls = DragonBalls.getInstance();
    gokuDragonBalls.collectBall();
    gokuDragonBalls.collectBall();
    gokuDragonBalls.collectBall();

    gokuDragonBalls.summonShenlong();

    const vegetaDragonBalls = DragonBalls.getInstance();
    vegetaDragonBalls.collectBall();
    vegetaDragonBalls.collectBall();
    vegetaDragonBalls.collectBall();
    vegetaDragonBalls.collectBall();

    gokuDragonBalls.summonShenlong();
    vegetaDragonBalls.summonShenlong();
    

}

main();
