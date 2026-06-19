/**
 * ! Inmutabilidad con copia
 * Aunque la inmutabilidad es una buena práctica, no siempre es posible.
 * En estos casos, se puede hacer una copia del objeto y modificar la copia.
 *
 *  * Es útil para mantener un historial de estados en aplicaciones interactivas.
 *
 */
import { COLORS } from '../helpers/colors.ts';
class CodeEditorState {
    readonly content: string;
    readonly cursorPosition: number;
    readonly unsaveChanges: boolean;

    constructor(content: string, cursorPosition: number, unsaveChanges: boolean) {
        this.content = content;
        this.cursorPosition = cursorPosition;
        this.unsaveChanges = unsaveChanges;
    }

    copyWith({
        content,
        cursorPosition,
        unsaveChanges
    }: Partial<CodeEditorState>): CodeEditorState {
        return new CodeEditorState(
            content ?? this.content,
            cursorPosition ?? this.cursorPosition,
            unsaveChanges ?? this.unsaveChanges
        );
    }

    displayState() {
        console.log('%cEstado del editor', COLORS.green);
        console.log(`
            Contenido: ${this.content}
            Cursor Pos: ${this.cursorPosition}
            Unsave: ${this.unsaveChanges}
            `);
    }
}

class CodeEditorHistory {
    private history: CodeEditorState[] = [];// 0 1 2 3 4 5 6
    private currentStateIndex: number = -1;

    save(state: CodeEditorState) {
        if (this.currentStateIndex < this.history.length - 1) {
            this.history = this.history.slice(0, this.currentStateIndex + 1);
        }

        this.history.push(state);
        this.currentStateIndex++;
    }

    undo(): CodeEditorState | null {
        if (this.currentStateIndex > 0) {
            this.currentStateIndex--;
            return this.history[this.currentStateIndex];
        }
        return null;
    }

    redo(): CodeEditorState | null {
        if (this.currentStateIndex < this.history.length - 1) {
            this.currentStateIndex++;
            return this.history[this.currentStateIndex];
        }
        return null;
    }

}

function main() {
    const history = new CodeEditorHistory();
    console.log('%cEstado inicial', COLORS.blue);
    let editorState = new CodeEditorState(
        'console.log("Hello, World!");',
        2,
        false
    );
    history.save(editorState);
    editorState.displayState();

    console.log('%c2 cambio', COLORS.blue);
    editorState = editorState.copyWith({
        content: "console.log('Hola mundo'); \n console.log('nueva linea');",
        cursorPosition: 3,
        unsaveChanges: true
    });
    history.save(editorState);
    editorState.displayState();

    console.log('%cMover el cursor', COLORS.blue);
    editorState = editorState.copyWith({
        cursorPosition: 5,
    });
    history.save(editorState);
    editorState.displayState();

    console.log('%cUNDO', COLORS.blue);
    editorState = history.undo()!;
    editorState.displayState();

    console.log('%cREDO', COLORS.blue);
    editorState = history.redo()!;
    editorState.displayState();
}

main();
