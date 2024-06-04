type Either<A, B> = A | B;

type Maybe<A> = Either<A, false>;

type EmptyList = null;

type Cons<FIRST, REST extends (Cons<any, any> | EmptyList)> = {
    first: FIRST,
    rest: REST
}

type List<A> =
    EmptyList |
    {
        first: A,
        rest: Cons<A, List<A>> | EmptyList
    };



export { Either, Maybe, EmptyList, List, Cons };