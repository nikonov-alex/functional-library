type Maybe<A> = A | false;

type EmptyList = null;
type Cons<A> = {
    first: A,
    rest: List<A>
};
type List<A> =
    EmptyList |
    Cons<A>;

export { Maybe, EmptyList, List, Cons };