type Maybe<A> = A | false;

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



export { Maybe, EmptyList, List, Cons };