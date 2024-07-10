export const local = <T, R>( value: T, callback: { ( value: T ): R } ): R =>
    callback( value );