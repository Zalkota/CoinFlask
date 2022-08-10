class Stack {
    constructor() {
        this.top = -1;
        this.items = {};
    }

    get peek() {
        return this.items[this.top];
    }

    push(value) {
        this.top += 1;
        this.items[this.top] = value;
    }

    remove() {
        if (this.top != -1) {
            this.top -= 1;
            this.items[this.top] = undefined;
        }
    }
}

describe('My Stack', () => {

    let stack;

    beforeEach(() => {
        stack = new Stack();
    });

    it('is created empty', () => {


        expect(stack.top).toBe(-1);
        expect(stack.items).toEqual({});
    });

    it('can push to the top', () => {
        stack.push('Avocado')
        expect(stack.top).toBe(0);
        expect(stack.peek).toBe('Avocado');
    });

    it.todo('can pop off', () => {
        let top = stack.top
        stack.remove()
        expect(stack.top).toBe(top - 1)
    });

})
