type Maybe<A> = A | false;

type EmptyList = null;
type Cons<A, B=A> = {
    first: A,
    rest: List<B>
};
type List<A> =
    EmptyList |
    Cons<A>;

export { Maybe, EmptyList, List, Cons };