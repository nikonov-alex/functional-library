type Maybe<A> = A | false;

type EmptyList = null;
type List<A> =
    EmptyList |
    {
        first: A,
        rest: List<A>
    };

export { Maybe, EmptyList, List };