
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Profile
 * 
 */
export type Profile = $Result.DefaultSelection<Prisma.$ProfilePayload>
/**
 * Model Resume
 * 
 */
export type Resume = $Result.DefaultSelection<Prisma.$ResumePayload>
/**
 * Model ResumeVersion
 * 
 */
export type ResumeVersion = $Result.DefaultSelection<Prisma.$ResumeVersionPayload>
/**
 * Model ResumeAnalysis
 * 
 */
export type ResumeAnalysis = $Result.DefaultSelection<Prisma.$ResumeAnalysisPayload>
/**
 * Model Application
 * 
 */
export type Application = $Result.DefaultSelection<Prisma.$ApplicationPayload>
/**
 * Model CareerRoadmap
 * 
 */
export type CareerRoadmap = $Result.DefaultSelection<Prisma.$CareerRoadmapPayload>
/**
 * Model RoadmapMilestone
 * 
 */
export type RoadmapMilestone = $Result.DefaultSelection<Prisma.$RoadmapMilestonePayload>
/**
 * Model InterviewSession
 * 
 */
export type InterviewSession = $Result.DefaultSelection<Prisma.$InterviewSessionPayload>
/**
 * Model InterviewQuestion
 * 
 */
export type InterviewQuestion = $Result.DefaultSelection<Prisma.$InterviewQuestionPayload>
/**
 * Model ActionItem
 * 
 */
export type ActionItem = $Result.DefaultSelection<Prisma.$ActionItemPayload>
/**
 * Model ProjectRecommendation
 * 
 */
export type ProjectRecommendation = $Result.DefaultSelection<Prisma.$ProjectRecommendationPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs, $Utils.Call<Prisma.TypeMapCb, {
    extArgs: ExtArgs
  }>, ClientOptions>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.profile`: Exposes CRUD operations for the **Profile** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Profiles
    * const profiles = await prisma.profile.findMany()
    * ```
    */
  get profile(): Prisma.ProfileDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.resume`: Exposes CRUD operations for the **Resume** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Resumes
    * const resumes = await prisma.resume.findMany()
    * ```
    */
  get resume(): Prisma.ResumeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.resumeVersion`: Exposes CRUD operations for the **ResumeVersion** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ResumeVersions
    * const resumeVersions = await prisma.resumeVersion.findMany()
    * ```
    */
  get resumeVersion(): Prisma.ResumeVersionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.resumeAnalysis`: Exposes CRUD operations for the **ResumeAnalysis** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ResumeAnalyses
    * const resumeAnalyses = await prisma.resumeAnalysis.findMany()
    * ```
    */
  get resumeAnalysis(): Prisma.ResumeAnalysisDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.application`: Exposes CRUD operations for the **Application** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Applications
    * const applications = await prisma.application.findMany()
    * ```
    */
  get application(): Prisma.ApplicationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.careerRoadmap`: Exposes CRUD operations for the **CareerRoadmap** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CareerRoadmaps
    * const careerRoadmaps = await prisma.careerRoadmap.findMany()
    * ```
    */
  get careerRoadmap(): Prisma.CareerRoadmapDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.roadmapMilestone`: Exposes CRUD operations for the **RoadmapMilestone** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RoadmapMilestones
    * const roadmapMilestones = await prisma.roadmapMilestone.findMany()
    * ```
    */
  get roadmapMilestone(): Prisma.RoadmapMilestoneDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.interviewSession`: Exposes CRUD operations for the **InterviewSession** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more InterviewSessions
    * const interviewSessions = await prisma.interviewSession.findMany()
    * ```
    */
  get interviewSession(): Prisma.InterviewSessionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.interviewQuestion`: Exposes CRUD operations for the **InterviewQuestion** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more InterviewQuestions
    * const interviewQuestions = await prisma.interviewQuestion.findMany()
    * ```
    */
  get interviewQuestion(): Prisma.InterviewQuestionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.actionItem`: Exposes CRUD operations for the **ActionItem** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ActionItems
    * const actionItems = await prisma.actionItem.findMany()
    * ```
    */
  get actionItem(): Prisma.ActionItemDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.projectRecommendation`: Exposes CRUD operations for the **ProjectRecommendation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ProjectRecommendations
    * const projectRecommendations = await prisma.projectRecommendation.findMany()
    * ```
    */
  get projectRecommendation(): Prisma.ProjectRecommendationDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.4.0
   * Query Engine version: a9055b89e58b4b5bfb59600785423b1db3d0e75d
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Profile: 'Profile',
    Resume: 'Resume',
    ResumeVersion: 'ResumeVersion',
    ResumeAnalysis: 'ResumeAnalysis',
    Application: 'Application',
    CareerRoadmap: 'CareerRoadmap',
    RoadmapMilestone: 'RoadmapMilestone',
    InterviewSession: 'InterviewSession',
    InterviewQuestion: 'InterviewQuestion',
    ActionItem: 'ActionItem',
    ProjectRecommendation: 'ProjectRecommendation'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "user" | "profile" | "resume" | "resumeVersion" | "resumeAnalysis" | "application" | "careerRoadmap" | "roadmapMilestone" | "interviewSession" | "interviewQuestion" | "actionItem" | "projectRecommendation"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Profile: {
        payload: Prisma.$ProfilePayload<ExtArgs>
        fields: Prisma.ProfileFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProfileFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProfileFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>
          }
          findFirst: {
            args: Prisma.ProfileFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProfileFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>
          }
          findMany: {
            args: Prisma.ProfileFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>[]
          }
          create: {
            args: Prisma.ProfileCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>
          }
          createMany: {
            args: Prisma.ProfileCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProfileCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>[]
          }
          delete: {
            args: Prisma.ProfileDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>
          }
          update: {
            args: Prisma.ProfileUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>
          }
          deleteMany: {
            args: Prisma.ProfileDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProfileUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProfileUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>[]
          }
          upsert: {
            args: Prisma.ProfileUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>
          }
          aggregate: {
            args: Prisma.ProfileAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProfile>
          }
          groupBy: {
            args: Prisma.ProfileGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProfileGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProfileCountArgs<ExtArgs>
            result: $Utils.Optional<ProfileCountAggregateOutputType> | number
          }
        }
      }
      Resume: {
        payload: Prisma.$ResumePayload<ExtArgs>
        fields: Prisma.ResumeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ResumeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ResumeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumePayload>
          }
          findFirst: {
            args: Prisma.ResumeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ResumeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumePayload>
          }
          findMany: {
            args: Prisma.ResumeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumePayload>[]
          }
          create: {
            args: Prisma.ResumeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumePayload>
          }
          createMany: {
            args: Prisma.ResumeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ResumeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumePayload>[]
          }
          delete: {
            args: Prisma.ResumeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumePayload>
          }
          update: {
            args: Prisma.ResumeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumePayload>
          }
          deleteMany: {
            args: Prisma.ResumeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ResumeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ResumeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumePayload>[]
          }
          upsert: {
            args: Prisma.ResumeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumePayload>
          }
          aggregate: {
            args: Prisma.ResumeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateResume>
          }
          groupBy: {
            args: Prisma.ResumeGroupByArgs<ExtArgs>
            result: $Utils.Optional<ResumeGroupByOutputType>[]
          }
          count: {
            args: Prisma.ResumeCountArgs<ExtArgs>
            result: $Utils.Optional<ResumeCountAggregateOutputType> | number
          }
        }
      }
      ResumeVersion: {
        payload: Prisma.$ResumeVersionPayload<ExtArgs>
        fields: Prisma.ResumeVersionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ResumeVersionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumeVersionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ResumeVersionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumeVersionPayload>
          }
          findFirst: {
            args: Prisma.ResumeVersionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumeVersionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ResumeVersionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumeVersionPayload>
          }
          findMany: {
            args: Prisma.ResumeVersionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumeVersionPayload>[]
          }
          create: {
            args: Prisma.ResumeVersionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumeVersionPayload>
          }
          createMany: {
            args: Prisma.ResumeVersionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ResumeVersionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumeVersionPayload>[]
          }
          delete: {
            args: Prisma.ResumeVersionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumeVersionPayload>
          }
          update: {
            args: Prisma.ResumeVersionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumeVersionPayload>
          }
          deleteMany: {
            args: Prisma.ResumeVersionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ResumeVersionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ResumeVersionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumeVersionPayload>[]
          }
          upsert: {
            args: Prisma.ResumeVersionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumeVersionPayload>
          }
          aggregate: {
            args: Prisma.ResumeVersionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateResumeVersion>
          }
          groupBy: {
            args: Prisma.ResumeVersionGroupByArgs<ExtArgs>
            result: $Utils.Optional<ResumeVersionGroupByOutputType>[]
          }
          count: {
            args: Prisma.ResumeVersionCountArgs<ExtArgs>
            result: $Utils.Optional<ResumeVersionCountAggregateOutputType> | number
          }
        }
      }
      ResumeAnalysis: {
        payload: Prisma.$ResumeAnalysisPayload<ExtArgs>
        fields: Prisma.ResumeAnalysisFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ResumeAnalysisFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumeAnalysisPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ResumeAnalysisFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumeAnalysisPayload>
          }
          findFirst: {
            args: Prisma.ResumeAnalysisFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumeAnalysisPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ResumeAnalysisFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumeAnalysisPayload>
          }
          findMany: {
            args: Prisma.ResumeAnalysisFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumeAnalysisPayload>[]
          }
          create: {
            args: Prisma.ResumeAnalysisCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumeAnalysisPayload>
          }
          createMany: {
            args: Prisma.ResumeAnalysisCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ResumeAnalysisCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumeAnalysisPayload>[]
          }
          delete: {
            args: Prisma.ResumeAnalysisDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumeAnalysisPayload>
          }
          update: {
            args: Prisma.ResumeAnalysisUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumeAnalysisPayload>
          }
          deleteMany: {
            args: Prisma.ResumeAnalysisDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ResumeAnalysisUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ResumeAnalysisUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumeAnalysisPayload>[]
          }
          upsert: {
            args: Prisma.ResumeAnalysisUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumeAnalysisPayload>
          }
          aggregate: {
            args: Prisma.ResumeAnalysisAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateResumeAnalysis>
          }
          groupBy: {
            args: Prisma.ResumeAnalysisGroupByArgs<ExtArgs>
            result: $Utils.Optional<ResumeAnalysisGroupByOutputType>[]
          }
          count: {
            args: Prisma.ResumeAnalysisCountArgs<ExtArgs>
            result: $Utils.Optional<ResumeAnalysisCountAggregateOutputType> | number
          }
        }
      }
      Application: {
        payload: Prisma.$ApplicationPayload<ExtArgs>
        fields: Prisma.ApplicationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ApplicationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApplicationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ApplicationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApplicationPayload>
          }
          findFirst: {
            args: Prisma.ApplicationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApplicationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ApplicationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApplicationPayload>
          }
          findMany: {
            args: Prisma.ApplicationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApplicationPayload>[]
          }
          create: {
            args: Prisma.ApplicationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApplicationPayload>
          }
          createMany: {
            args: Prisma.ApplicationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ApplicationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApplicationPayload>[]
          }
          delete: {
            args: Prisma.ApplicationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApplicationPayload>
          }
          update: {
            args: Prisma.ApplicationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApplicationPayload>
          }
          deleteMany: {
            args: Prisma.ApplicationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ApplicationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ApplicationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApplicationPayload>[]
          }
          upsert: {
            args: Prisma.ApplicationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApplicationPayload>
          }
          aggregate: {
            args: Prisma.ApplicationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateApplication>
          }
          groupBy: {
            args: Prisma.ApplicationGroupByArgs<ExtArgs>
            result: $Utils.Optional<ApplicationGroupByOutputType>[]
          }
          count: {
            args: Prisma.ApplicationCountArgs<ExtArgs>
            result: $Utils.Optional<ApplicationCountAggregateOutputType> | number
          }
        }
      }
      CareerRoadmap: {
        payload: Prisma.$CareerRoadmapPayload<ExtArgs>
        fields: Prisma.CareerRoadmapFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CareerRoadmapFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CareerRoadmapPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CareerRoadmapFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CareerRoadmapPayload>
          }
          findFirst: {
            args: Prisma.CareerRoadmapFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CareerRoadmapPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CareerRoadmapFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CareerRoadmapPayload>
          }
          findMany: {
            args: Prisma.CareerRoadmapFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CareerRoadmapPayload>[]
          }
          create: {
            args: Prisma.CareerRoadmapCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CareerRoadmapPayload>
          }
          createMany: {
            args: Prisma.CareerRoadmapCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CareerRoadmapCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CareerRoadmapPayload>[]
          }
          delete: {
            args: Prisma.CareerRoadmapDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CareerRoadmapPayload>
          }
          update: {
            args: Prisma.CareerRoadmapUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CareerRoadmapPayload>
          }
          deleteMany: {
            args: Prisma.CareerRoadmapDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CareerRoadmapUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CareerRoadmapUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CareerRoadmapPayload>[]
          }
          upsert: {
            args: Prisma.CareerRoadmapUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CareerRoadmapPayload>
          }
          aggregate: {
            args: Prisma.CareerRoadmapAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCareerRoadmap>
          }
          groupBy: {
            args: Prisma.CareerRoadmapGroupByArgs<ExtArgs>
            result: $Utils.Optional<CareerRoadmapGroupByOutputType>[]
          }
          count: {
            args: Prisma.CareerRoadmapCountArgs<ExtArgs>
            result: $Utils.Optional<CareerRoadmapCountAggregateOutputType> | number
          }
        }
      }
      RoadmapMilestone: {
        payload: Prisma.$RoadmapMilestonePayload<ExtArgs>
        fields: Prisma.RoadmapMilestoneFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RoadmapMilestoneFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoadmapMilestonePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RoadmapMilestoneFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoadmapMilestonePayload>
          }
          findFirst: {
            args: Prisma.RoadmapMilestoneFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoadmapMilestonePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RoadmapMilestoneFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoadmapMilestonePayload>
          }
          findMany: {
            args: Prisma.RoadmapMilestoneFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoadmapMilestonePayload>[]
          }
          create: {
            args: Prisma.RoadmapMilestoneCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoadmapMilestonePayload>
          }
          createMany: {
            args: Prisma.RoadmapMilestoneCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RoadmapMilestoneCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoadmapMilestonePayload>[]
          }
          delete: {
            args: Prisma.RoadmapMilestoneDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoadmapMilestonePayload>
          }
          update: {
            args: Prisma.RoadmapMilestoneUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoadmapMilestonePayload>
          }
          deleteMany: {
            args: Prisma.RoadmapMilestoneDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RoadmapMilestoneUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RoadmapMilestoneUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoadmapMilestonePayload>[]
          }
          upsert: {
            args: Prisma.RoadmapMilestoneUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoadmapMilestonePayload>
          }
          aggregate: {
            args: Prisma.RoadmapMilestoneAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRoadmapMilestone>
          }
          groupBy: {
            args: Prisma.RoadmapMilestoneGroupByArgs<ExtArgs>
            result: $Utils.Optional<RoadmapMilestoneGroupByOutputType>[]
          }
          count: {
            args: Prisma.RoadmapMilestoneCountArgs<ExtArgs>
            result: $Utils.Optional<RoadmapMilestoneCountAggregateOutputType> | number
          }
        }
      }
      InterviewSession: {
        payload: Prisma.$InterviewSessionPayload<ExtArgs>
        fields: Prisma.InterviewSessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.InterviewSessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InterviewSessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.InterviewSessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InterviewSessionPayload>
          }
          findFirst: {
            args: Prisma.InterviewSessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InterviewSessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.InterviewSessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InterviewSessionPayload>
          }
          findMany: {
            args: Prisma.InterviewSessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InterviewSessionPayload>[]
          }
          create: {
            args: Prisma.InterviewSessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InterviewSessionPayload>
          }
          createMany: {
            args: Prisma.InterviewSessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.InterviewSessionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InterviewSessionPayload>[]
          }
          delete: {
            args: Prisma.InterviewSessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InterviewSessionPayload>
          }
          update: {
            args: Prisma.InterviewSessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InterviewSessionPayload>
          }
          deleteMany: {
            args: Prisma.InterviewSessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.InterviewSessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.InterviewSessionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InterviewSessionPayload>[]
          }
          upsert: {
            args: Prisma.InterviewSessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InterviewSessionPayload>
          }
          aggregate: {
            args: Prisma.InterviewSessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateInterviewSession>
          }
          groupBy: {
            args: Prisma.InterviewSessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<InterviewSessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.InterviewSessionCountArgs<ExtArgs>
            result: $Utils.Optional<InterviewSessionCountAggregateOutputType> | number
          }
        }
      }
      InterviewQuestion: {
        payload: Prisma.$InterviewQuestionPayload<ExtArgs>
        fields: Prisma.InterviewQuestionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.InterviewQuestionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InterviewQuestionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.InterviewQuestionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InterviewQuestionPayload>
          }
          findFirst: {
            args: Prisma.InterviewQuestionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InterviewQuestionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.InterviewQuestionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InterviewQuestionPayload>
          }
          findMany: {
            args: Prisma.InterviewQuestionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InterviewQuestionPayload>[]
          }
          create: {
            args: Prisma.InterviewQuestionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InterviewQuestionPayload>
          }
          createMany: {
            args: Prisma.InterviewQuestionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.InterviewQuestionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InterviewQuestionPayload>[]
          }
          delete: {
            args: Prisma.InterviewQuestionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InterviewQuestionPayload>
          }
          update: {
            args: Prisma.InterviewQuestionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InterviewQuestionPayload>
          }
          deleteMany: {
            args: Prisma.InterviewQuestionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.InterviewQuestionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.InterviewQuestionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InterviewQuestionPayload>[]
          }
          upsert: {
            args: Prisma.InterviewQuestionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InterviewQuestionPayload>
          }
          aggregate: {
            args: Prisma.InterviewQuestionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateInterviewQuestion>
          }
          groupBy: {
            args: Prisma.InterviewQuestionGroupByArgs<ExtArgs>
            result: $Utils.Optional<InterviewQuestionGroupByOutputType>[]
          }
          count: {
            args: Prisma.InterviewQuestionCountArgs<ExtArgs>
            result: $Utils.Optional<InterviewQuestionCountAggregateOutputType> | number
          }
        }
      }
      ActionItem: {
        payload: Prisma.$ActionItemPayload<ExtArgs>
        fields: Prisma.ActionItemFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ActionItemFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActionItemPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ActionItemFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActionItemPayload>
          }
          findFirst: {
            args: Prisma.ActionItemFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActionItemPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ActionItemFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActionItemPayload>
          }
          findMany: {
            args: Prisma.ActionItemFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActionItemPayload>[]
          }
          create: {
            args: Prisma.ActionItemCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActionItemPayload>
          }
          createMany: {
            args: Prisma.ActionItemCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ActionItemCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActionItemPayload>[]
          }
          delete: {
            args: Prisma.ActionItemDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActionItemPayload>
          }
          update: {
            args: Prisma.ActionItemUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActionItemPayload>
          }
          deleteMany: {
            args: Prisma.ActionItemDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ActionItemUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ActionItemUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActionItemPayload>[]
          }
          upsert: {
            args: Prisma.ActionItemUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActionItemPayload>
          }
          aggregate: {
            args: Prisma.ActionItemAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateActionItem>
          }
          groupBy: {
            args: Prisma.ActionItemGroupByArgs<ExtArgs>
            result: $Utils.Optional<ActionItemGroupByOutputType>[]
          }
          count: {
            args: Prisma.ActionItemCountArgs<ExtArgs>
            result: $Utils.Optional<ActionItemCountAggregateOutputType> | number
          }
        }
      }
      ProjectRecommendation: {
        payload: Prisma.$ProjectRecommendationPayload<ExtArgs>
        fields: Prisma.ProjectRecommendationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProjectRecommendationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectRecommendationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProjectRecommendationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectRecommendationPayload>
          }
          findFirst: {
            args: Prisma.ProjectRecommendationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectRecommendationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProjectRecommendationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectRecommendationPayload>
          }
          findMany: {
            args: Prisma.ProjectRecommendationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectRecommendationPayload>[]
          }
          create: {
            args: Prisma.ProjectRecommendationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectRecommendationPayload>
          }
          createMany: {
            args: Prisma.ProjectRecommendationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProjectRecommendationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectRecommendationPayload>[]
          }
          delete: {
            args: Prisma.ProjectRecommendationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectRecommendationPayload>
          }
          update: {
            args: Prisma.ProjectRecommendationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectRecommendationPayload>
          }
          deleteMany: {
            args: Prisma.ProjectRecommendationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProjectRecommendationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProjectRecommendationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectRecommendationPayload>[]
          }
          upsert: {
            args: Prisma.ProjectRecommendationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectRecommendationPayload>
          }
          aggregate: {
            args: Prisma.ProjectRecommendationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProjectRecommendation>
          }
          groupBy: {
            args: Prisma.ProjectRecommendationGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProjectRecommendationGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProjectRecommendationCountArgs<ExtArgs>
            result: $Utils.Optional<ProjectRecommendationCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    profile?: ProfileOmit
    resume?: ResumeOmit
    resumeVersion?: ResumeVersionOmit
    resumeAnalysis?: ResumeAnalysisOmit
    application?: ApplicationOmit
    careerRoadmap?: CareerRoadmapOmit
    roadmapMilestone?: RoadmapMilestoneOmit
    interviewSession?: InterviewSessionOmit
    interviewQuestion?: InterviewQuestionOmit
    actionItem?: ActionItemOmit
    projectRecommendation?: ProjectRecommendationOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    resumes: number
    applications: number
    roadmaps: number
    interviewSessions: number
    actionItems: number
    projects: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    resumes?: boolean | UserCountOutputTypeCountResumesArgs
    applications?: boolean | UserCountOutputTypeCountApplicationsArgs
    roadmaps?: boolean | UserCountOutputTypeCountRoadmapsArgs
    interviewSessions?: boolean | UserCountOutputTypeCountInterviewSessionsArgs
    actionItems?: boolean | UserCountOutputTypeCountActionItemsArgs
    projects?: boolean | UserCountOutputTypeCountProjectsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountResumesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ResumeWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountApplicationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ApplicationWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountRoadmapsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CareerRoadmapWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountInterviewSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InterviewSessionWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountActionItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ActionItemWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountProjectsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectRecommendationWhereInput
  }


  /**
   * Count Type ResumeCountOutputType
   */

  export type ResumeCountOutputType = {
    versions: number
  }

  export type ResumeCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    versions?: boolean | ResumeCountOutputTypeCountVersionsArgs
  }

  // Custom InputTypes
  /**
   * ResumeCountOutputType without action
   */
  export type ResumeCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResumeCountOutputType
     */
    select?: ResumeCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ResumeCountOutputType without action
   */
  export type ResumeCountOutputTypeCountVersionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ResumeVersionWhereInput
  }


  /**
   * Count Type CareerRoadmapCountOutputType
   */

  export type CareerRoadmapCountOutputType = {
    milestones: number
  }

  export type CareerRoadmapCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    milestones?: boolean | CareerRoadmapCountOutputTypeCountMilestonesArgs
  }

  // Custom InputTypes
  /**
   * CareerRoadmapCountOutputType without action
   */
  export type CareerRoadmapCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CareerRoadmapCountOutputType
     */
    select?: CareerRoadmapCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CareerRoadmapCountOutputType without action
   */
  export type CareerRoadmapCountOutputTypeCountMilestonesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RoadmapMilestoneWhereInput
  }


  /**
   * Count Type InterviewSessionCountOutputType
   */

  export type InterviewSessionCountOutputType = {
    questions: number
  }

  export type InterviewSessionCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    questions?: boolean | InterviewSessionCountOutputTypeCountQuestionsArgs
  }

  // Custom InputTypes
  /**
   * InterviewSessionCountOutputType without action
   */
  export type InterviewSessionCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InterviewSessionCountOutputType
     */
    select?: InterviewSessionCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * InterviewSessionCountOutputType without action
   */
  export type InterviewSessionCountOutputTypeCountQuestionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InterviewQuestionWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    passwordHash: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    passwordHash: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    passwordHash: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    passwordHash?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    passwordHash?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    passwordHash?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    passwordHash: string
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    passwordHash?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    profile?: boolean | User$profileArgs<ExtArgs>
    resumes?: boolean | User$resumesArgs<ExtArgs>
    applications?: boolean | User$applicationsArgs<ExtArgs>
    roadmaps?: boolean | User$roadmapsArgs<ExtArgs>
    interviewSessions?: boolean | User$interviewSessionsArgs<ExtArgs>
    actionItems?: boolean | User$actionItemsArgs<ExtArgs>
    projects?: boolean | User$projectsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    passwordHash?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    passwordHash?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    passwordHash?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "passwordHash" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    profile?: boolean | User$profileArgs<ExtArgs>
    resumes?: boolean | User$resumesArgs<ExtArgs>
    applications?: boolean | User$applicationsArgs<ExtArgs>
    roadmaps?: boolean | User$roadmapsArgs<ExtArgs>
    interviewSessions?: boolean | User$interviewSessionsArgs<ExtArgs>
    actionItems?: boolean | User$actionItemsArgs<ExtArgs>
    projects?: boolean | User$projectsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      profile: Prisma.$ProfilePayload<ExtArgs> | null
      resumes: Prisma.$ResumePayload<ExtArgs>[]
      applications: Prisma.$ApplicationPayload<ExtArgs>[]
      roadmaps: Prisma.$CareerRoadmapPayload<ExtArgs>[]
      interviewSessions: Prisma.$InterviewSessionPayload<ExtArgs>[]
      actionItems: Prisma.$ActionItemPayload<ExtArgs>[]
      projects: Prisma.$ProjectRecommendationPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      passwordHash: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", ClientOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    profile<T extends User$profileArgs<ExtArgs> = {}>(args?: Subset<T, User$profileArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | null, null, ExtArgs, ClientOptions>
    resumes<T extends User$resumesArgs<ExtArgs> = {}>(args?: Subset<T, User$resumesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResumePayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
    applications<T extends User$applicationsArgs<ExtArgs> = {}>(args?: Subset<T, User$applicationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ApplicationPayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
    roadmaps<T extends User$roadmapsArgs<ExtArgs> = {}>(args?: Subset<T, User$roadmapsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CareerRoadmapPayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
    interviewSessions<T extends User$interviewSessionsArgs<ExtArgs> = {}>(args?: Subset<T, User$interviewSessionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InterviewSessionPayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
    actionItems<T extends User$actionItemsArgs<ExtArgs> = {}>(args?: Subset<T, User$actionItemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActionItemPayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
    projects<T extends User$projectsArgs<ExtArgs> = {}>(args?: Subset<T, User$projectsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectRecommendationPayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */ 
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly passwordHash: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.profile
   */
  export type User$profileArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    where?: ProfileWhereInput
  }

  /**
   * User.resumes
   */
  export type User$resumesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resume
     */
    select?: ResumeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resume
     */
    omit?: ResumeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeInclude<ExtArgs> | null
    where?: ResumeWhereInput
    orderBy?: ResumeOrderByWithRelationInput | ResumeOrderByWithRelationInput[]
    cursor?: ResumeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ResumeScalarFieldEnum | ResumeScalarFieldEnum[]
  }

  /**
   * User.applications
   */
  export type User$applicationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Application
     */
    select?: ApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Application
     */
    omit?: ApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicationInclude<ExtArgs> | null
    where?: ApplicationWhereInput
    orderBy?: ApplicationOrderByWithRelationInput | ApplicationOrderByWithRelationInput[]
    cursor?: ApplicationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ApplicationScalarFieldEnum | ApplicationScalarFieldEnum[]
  }

  /**
   * User.roadmaps
   */
  export type User$roadmapsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CareerRoadmap
     */
    select?: CareerRoadmapSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CareerRoadmap
     */
    omit?: CareerRoadmapOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CareerRoadmapInclude<ExtArgs> | null
    where?: CareerRoadmapWhereInput
    orderBy?: CareerRoadmapOrderByWithRelationInput | CareerRoadmapOrderByWithRelationInput[]
    cursor?: CareerRoadmapWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CareerRoadmapScalarFieldEnum | CareerRoadmapScalarFieldEnum[]
  }

  /**
   * User.interviewSessions
   */
  export type User$interviewSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InterviewSession
     */
    select?: InterviewSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InterviewSession
     */
    omit?: InterviewSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InterviewSessionInclude<ExtArgs> | null
    where?: InterviewSessionWhereInput
    orderBy?: InterviewSessionOrderByWithRelationInput | InterviewSessionOrderByWithRelationInput[]
    cursor?: InterviewSessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: InterviewSessionScalarFieldEnum | InterviewSessionScalarFieldEnum[]
  }

  /**
   * User.actionItems
   */
  export type User$actionItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActionItem
     */
    select?: ActionItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActionItem
     */
    omit?: ActionItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActionItemInclude<ExtArgs> | null
    where?: ActionItemWhereInput
    orderBy?: ActionItemOrderByWithRelationInput | ActionItemOrderByWithRelationInput[]
    cursor?: ActionItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ActionItemScalarFieldEnum | ActionItemScalarFieldEnum[]
  }

  /**
   * User.projects
   */
  export type User$projectsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectRecommendation
     */
    select?: ProjectRecommendationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectRecommendation
     */
    omit?: ProjectRecommendationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectRecommendationInclude<ExtArgs> | null
    where?: ProjectRecommendationWhereInput
    orderBy?: ProjectRecommendationOrderByWithRelationInput | ProjectRecommendationOrderByWithRelationInput[]
    cursor?: ProjectRecommendationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProjectRecommendationScalarFieldEnum | ProjectRecommendationScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Profile
   */

  export type AggregateProfile = {
    _count: ProfileCountAggregateOutputType | null
    _avg: ProfileAvgAggregateOutputType | null
    _sum: ProfileSumAggregateOutputType | null
    _min: ProfileMinAggregateOutputType | null
    _max: ProfileMaxAggregateOutputType | null
  }

  export type ProfileAvgAggregateOutputType = {
    streakDays: number | null
    dailyScore: number | null
    easySolved: number | null
    mediumSolved: number | null
    hardSolved: number | null
    targetTimeline: number | null
  }

  export type ProfileSumAggregateOutputType = {
    streakDays: number | null
    dailyScore: number | null
    easySolved: number | null
    mediumSolved: number | null
    hardSolved: number | null
    targetTimeline: number | null
  }

  export type ProfileMinAggregateOutputType = {
    id: string | null
    userId: string | null
    fullName: string | null
    targetRole: string | null
    targetLevel: string | null
    streakDays: number | null
    dailyScore: number | null
    easySolved: number | null
    mediumSolved: number | null
    hardSolved: number | null
    targetCompany: string | null
    companyType: string | null
    specialization: string | null
    experienceLevel: string | null
    targetTimeline: number | null
    timeAvailable: string | null
    onboardingCompleted: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProfileMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    fullName: string | null
    targetRole: string | null
    targetLevel: string | null
    streakDays: number | null
    dailyScore: number | null
    easySolved: number | null
    mediumSolved: number | null
    hardSolved: number | null
    targetCompany: string | null
    companyType: string | null
    specialization: string | null
    experienceLevel: string | null
    targetTimeline: number | null
    timeAvailable: string | null
    onboardingCompleted: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProfileCountAggregateOutputType = {
    id: number
    userId: number
    fullName: number
    targetRole: number
    targetLevel: number
    streakDays: number
    dailyScore: number
    easySolved: number
    mediumSolved: number
    hardSolved: number
    targetCompany: number
    companyType: number
    specialization: number
    experienceLevel: number
    targetTimeline: number
    timeAvailable: number
    currentSkills: number
    onboardingCompleted: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ProfileAvgAggregateInputType = {
    streakDays?: true
    dailyScore?: true
    easySolved?: true
    mediumSolved?: true
    hardSolved?: true
    targetTimeline?: true
  }

  export type ProfileSumAggregateInputType = {
    streakDays?: true
    dailyScore?: true
    easySolved?: true
    mediumSolved?: true
    hardSolved?: true
    targetTimeline?: true
  }

  export type ProfileMinAggregateInputType = {
    id?: true
    userId?: true
    fullName?: true
    targetRole?: true
    targetLevel?: true
    streakDays?: true
    dailyScore?: true
    easySolved?: true
    mediumSolved?: true
    hardSolved?: true
    targetCompany?: true
    companyType?: true
    specialization?: true
    experienceLevel?: true
    targetTimeline?: true
    timeAvailable?: true
    onboardingCompleted?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProfileMaxAggregateInputType = {
    id?: true
    userId?: true
    fullName?: true
    targetRole?: true
    targetLevel?: true
    streakDays?: true
    dailyScore?: true
    easySolved?: true
    mediumSolved?: true
    hardSolved?: true
    targetCompany?: true
    companyType?: true
    specialization?: true
    experienceLevel?: true
    targetTimeline?: true
    timeAvailable?: true
    onboardingCompleted?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProfileCountAggregateInputType = {
    id?: true
    userId?: true
    fullName?: true
    targetRole?: true
    targetLevel?: true
    streakDays?: true
    dailyScore?: true
    easySolved?: true
    mediumSolved?: true
    hardSolved?: true
    targetCompany?: true
    companyType?: true
    specialization?: true
    experienceLevel?: true
    targetTimeline?: true
    timeAvailable?: true
    currentSkills?: true
    onboardingCompleted?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ProfileAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Profile to aggregate.
     */
    where?: ProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Profiles to fetch.
     */
    orderBy?: ProfileOrderByWithRelationInput | ProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Profiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Profiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Profiles
    **/
    _count?: true | ProfileCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProfileAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProfileSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProfileMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProfileMaxAggregateInputType
  }

  export type GetProfileAggregateType<T extends ProfileAggregateArgs> = {
        [P in keyof T & keyof AggregateProfile]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProfile[P]>
      : GetScalarType<T[P], AggregateProfile[P]>
  }




  export type ProfileGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProfileWhereInput
    orderBy?: ProfileOrderByWithAggregationInput | ProfileOrderByWithAggregationInput[]
    by: ProfileScalarFieldEnum[] | ProfileScalarFieldEnum
    having?: ProfileScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProfileCountAggregateInputType | true
    _avg?: ProfileAvgAggregateInputType
    _sum?: ProfileSumAggregateInputType
    _min?: ProfileMinAggregateInputType
    _max?: ProfileMaxAggregateInputType
  }

  export type ProfileGroupByOutputType = {
    id: string
    userId: string
    fullName: string
    targetRole: string | null
    targetLevel: string | null
    streakDays: number
    dailyScore: number
    easySolved: number
    mediumSolved: number
    hardSolved: number
    targetCompany: string | null
    companyType: string | null
    specialization: string | null
    experienceLevel: string | null
    targetTimeline: number
    timeAvailable: string | null
    currentSkills: JsonValue
    onboardingCompleted: boolean
    createdAt: Date
    updatedAt: Date
    _count: ProfileCountAggregateOutputType | null
    _avg: ProfileAvgAggregateOutputType | null
    _sum: ProfileSumAggregateOutputType | null
    _min: ProfileMinAggregateOutputType | null
    _max: ProfileMaxAggregateOutputType | null
  }

  type GetProfileGroupByPayload<T extends ProfileGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProfileGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProfileGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProfileGroupByOutputType[P]>
            : GetScalarType<T[P], ProfileGroupByOutputType[P]>
        }
      >
    >


  export type ProfileSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    fullName?: boolean
    targetRole?: boolean
    targetLevel?: boolean
    streakDays?: boolean
    dailyScore?: boolean
    easySolved?: boolean
    mediumSolved?: boolean
    hardSolved?: boolean
    targetCompany?: boolean
    companyType?: boolean
    specialization?: boolean
    experienceLevel?: boolean
    targetTimeline?: boolean
    timeAvailable?: boolean
    currentSkills?: boolean
    onboardingCompleted?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["profile"]>

  export type ProfileSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    fullName?: boolean
    targetRole?: boolean
    targetLevel?: boolean
    streakDays?: boolean
    dailyScore?: boolean
    easySolved?: boolean
    mediumSolved?: boolean
    hardSolved?: boolean
    targetCompany?: boolean
    companyType?: boolean
    specialization?: boolean
    experienceLevel?: boolean
    targetTimeline?: boolean
    timeAvailable?: boolean
    currentSkills?: boolean
    onboardingCompleted?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["profile"]>

  export type ProfileSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    fullName?: boolean
    targetRole?: boolean
    targetLevel?: boolean
    streakDays?: boolean
    dailyScore?: boolean
    easySolved?: boolean
    mediumSolved?: boolean
    hardSolved?: boolean
    targetCompany?: boolean
    companyType?: boolean
    specialization?: boolean
    experienceLevel?: boolean
    targetTimeline?: boolean
    timeAvailable?: boolean
    currentSkills?: boolean
    onboardingCompleted?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["profile"]>

  export type ProfileSelectScalar = {
    id?: boolean
    userId?: boolean
    fullName?: boolean
    targetRole?: boolean
    targetLevel?: boolean
    streakDays?: boolean
    dailyScore?: boolean
    easySolved?: boolean
    mediumSolved?: boolean
    hardSolved?: boolean
    targetCompany?: boolean
    companyType?: boolean
    specialization?: boolean
    experienceLevel?: boolean
    targetTimeline?: boolean
    timeAvailable?: boolean
    currentSkills?: boolean
    onboardingCompleted?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ProfileOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "fullName" | "targetRole" | "targetLevel" | "streakDays" | "dailyScore" | "easySolved" | "mediumSolved" | "hardSolved" | "targetCompany" | "companyType" | "specialization" | "experienceLevel" | "targetTimeline" | "timeAvailable" | "currentSkills" | "onboardingCompleted" | "createdAt" | "updatedAt", ExtArgs["result"]["profile"]>
  export type ProfileInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ProfileIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ProfileIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ProfilePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Profile"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      fullName: string
      targetRole: string | null
      targetLevel: string | null
      streakDays: number
      dailyScore: number
      easySolved: number
      mediumSolved: number
      hardSolved: number
      targetCompany: string | null
      companyType: string | null
      specialization: string | null
      experienceLevel: string | null
      targetTimeline: number
      timeAvailable: string | null
      currentSkills: Prisma.JsonValue
      onboardingCompleted: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["profile"]>
    composites: {}
  }

  type ProfileGetPayload<S extends boolean | null | undefined | ProfileDefaultArgs> = $Result.GetResult<Prisma.$ProfilePayload, S>

  type ProfileCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProfileFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProfileCountAggregateInputType | true
    }

  export interface ProfileDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Profile'], meta: { name: 'Profile' } }
    /**
     * Find zero or one Profile that matches the filter.
     * @param {ProfileFindUniqueArgs} args - Arguments to find a Profile
     * @example
     * // Get one Profile
     * const profile = await prisma.profile.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProfileFindUniqueArgs>(args: SelectSubset<T, ProfileFindUniqueArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one Profile that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProfileFindUniqueOrThrowArgs} args - Arguments to find a Profile
     * @example
     * // Get one Profile
     * const profile = await prisma.profile.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProfileFindUniqueOrThrowArgs>(args: SelectSubset<T, ProfileFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first Profile that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileFindFirstArgs} args - Arguments to find a Profile
     * @example
     * // Get one Profile
     * const profile = await prisma.profile.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProfileFindFirstArgs>(args?: SelectSubset<T, ProfileFindFirstArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first Profile that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileFindFirstOrThrowArgs} args - Arguments to find a Profile
     * @example
     * // Get one Profile
     * const profile = await prisma.profile.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProfileFindFirstOrThrowArgs>(args?: SelectSubset<T, ProfileFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more Profiles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Profiles
     * const profiles = await prisma.profile.findMany()
     * 
     * // Get first 10 Profiles
     * const profiles = await prisma.profile.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const profileWithIdOnly = await prisma.profile.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProfileFindManyArgs>(args?: SelectSubset<T, ProfileFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a Profile.
     * @param {ProfileCreateArgs} args - Arguments to create a Profile.
     * @example
     * // Create one Profile
     * const Profile = await prisma.profile.create({
     *   data: {
     *     // ... data to create a Profile
     *   }
     * })
     * 
     */
    create<T extends ProfileCreateArgs>(args: SelectSubset<T, ProfileCreateArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many Profiles.
     * @param {ProfileCreateManyArgs} args - Arguments to create many Profiles.
     * @example
     * // Create many Profiles
     * const profile = await prisma.profile.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProfileCreateManyArgs>(args?: SelectSubset<T, ProfileCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Profiles and returns the data saved in the database.
     * @param {ProfileCreateManyAndReturnArgs} args - Arguments to create many Profiles.
     * @example
     * // Create many Profiles
     * const profile = await prisma.profile.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Profiles and only return the `id`
     * const profileWithIdOnly = await prisma.profile.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProfileCreateManyAndReturnArgs>(args?: SelectSubset<T, ProfileCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a Profile.
     * @param {ProfileDeleteArgs} args - Arguments to delete one Profile.
     * @example
     * // Delete one Profile
     * const Profile = await prisma.profile.delete({
     *   where: {
     *     // ... filter to delete one Profile
     *   }
     * })
     * 
     */
    delete<T extends ProfileDeleteArgs>(args: SelectSubset<T, ProfileDeleteArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one Profile.
     * @param {ProfileUpdateArgs} args - Arguments to update one Profile.
     * @example
     * // Update one Profile
     * const profile = await prisma.profile.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProfileUpdateArgs>(args: SelectSubset<T, ProfileUpdateArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more Profiles.
     * @param {ProfileDeleteManyArgs} args - Arguments to filter Profiles to delete.
     * @example
     * // Delete a few Profiles
     * const { count } = await prisma.profile.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProfileDeleteManyArgs>(args?: SelectSubset<T, ProfileDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Profiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Profiles
     * const profile = await prisma.profile.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProfileUpdateManyArgs>(args: SelectSubset<T, ProfileUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Profiles and returns the data updated in the database.
     * @param {ProfileUpdateManyAndReturnArgs} args - Arguments to update many Profiles.
     * @example
     * // Update many Profiles
     * const profile = await prisma.profile.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Profiles and only return the `id`
     * const profileWithIdOnly = await prisma.profile.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProfileUpdateManyAndReturnArgs>(args: SelectSubset<T, ProfileUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "updateManyAndReturn", ClientOptions>>

    /**
     * Create or update one Profile.
     * @param {ProfileUpsertArgs} args - Arguments to update or create a Profile.
     * @example
     * // Update or create a Profile
     * const profile = await prisma.profile.upsert({
     *   create: {
     *     // ... data to create a Profile
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Profile we want to update
     *   }
     * })
     */
    upsert<T extends ProfileUpsertArgs>(args: SelectSubset<T, ProfileUpsertArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of Profiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileCountArgs} args - Arguments to filter Profiles to count.
     * @example
     * // Count the number of Profiles
     * const count = await prisma.profile.count({
     *   where: {
     *     // ... the filter for the Profiles we want to count
     *   }
     * })
    **/
    count<T extends ProfileCountArgs>(
      args?: Subset<T, ProfileCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProfileCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Profile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProfileAggregateArgs>(args: Subset<T, ProfileAggregateArgs>): Prisma.PrismaPromise<GetProfileAggregateType<T>>

    /**
     * Group by Profile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProfileGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProfileGroupByArgs['orderBy'] }
        : { orderBy?: ProfileGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProfileGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProfileGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Profile model
   */
  readonly fields: ProfileFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Profile.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProfileClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | Null, Null, ExtArgs, ClientOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Profile model
   */ 
  interface ProfileFieldRefs {
    readonly id: FieldRef<"Profile", 'String'>
    readonly userId: FieldRef<"Profile", 'String'>
    readonly fullName: FieldRef<"Profile", 'String'>
    readonly targetRole: FieldRef<"Profile", 'String'>
    readonly targetLevel: FieldRef<"Profile", 'String'>
    readonly streakDays: FieldRef<"Profile", 'Int'>
    readonly dailyScore: FieldRef<"Profile", 'Int'>
    readonly easySolved: FieldRef<"Profile", 'Int'>
    readonly mediumSolved: FieldRef<"Profile", 'Int'>
    readonly hardSolved: FieldRef<"Profile", 'Int'>
    readonly targetCompany: FieldRef<"Profile", 'String'>
    readonly companyType: FieldRef<"Profile", 'String'>
    readonly specialization: FieldRef<"Profile", 'String'>
    readonly experienceLevel: FieldRef<"Profile", 'String'>
    readonly targetTimeline: FieldRef<"Profile", 'Int'>
    readonly timeAvailable: FieldRef<"Profile", 'String'>
    readonly currentSkills: FieldRef<"Profile", 'Json'>
    readonly onboardingCompleted: FieldRef<"Profile", 'Boolean'>
    readonly createdAt: FieldRef<"Profile", 'DateTime'>
    readonly updatedAt: FieldRef<"Profile", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Profile findUnique
   */
  export type ProfileFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * Filter, which Profile to fetch.
     */
    where: ProfileWhereUniqueInput
  }

  /**
   * Profile findUniqueOrThrow
   */
  export type ProfileFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * Filter, which Profile to fetch.
     */
    where: ProfileWhereUniqueInput
  }

  /**
   * Profile findFirst
   */
  export type ProfileFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * Filter, which Profile to fetch.
     */
    where?: ProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Profiles to fetch.
     */
    orderBy?: ProfileOrderByWithRelationInput | ProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Profiles.
     */
    cursor?: ProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Profiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Profiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Profiles.
     */
    distinct?: ProfileScalarFieldEnum | ProfileScalarFieldEnum[]
  }

  /**
   * Profile findFirstOrThrow
   */
  export type ProfileFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * Filter, which Profile to fetch.
     */
    where?: ProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Profiles to fetch.
     */
    orderBy?: ProfileOrderByWithRelationInput | ProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Profiles.
     */
    cursor?: ProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Profiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Profiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Profiles.
     */
    distinct?: ProfileScalarFieldEnum | ProfileScalarFieldEnum[]
  }

  /**
   * Profile findMany
   */
  export type ProfileFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * Filter, which Profiles to fetch.
     */
    where?: ProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Profiles to fetch.
     */
    orderBy?: ProfileOrderByWithRelationInput | ProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Profiles.
     */
    cursor?: ProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Profiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Profiles.
     */
    skip?: number
    distinct?: ProfileScalarFieldEnum | ProfileScalarFieldEnum[]
  }

  /**
   * Profile create
   */
  export type ProfileCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * The data needed to create a Profile.
     */
    data: XOR<ProfileCreateInput, ProfileUncheckedCreateInput>
  }

  /**
   * Profile createMany
   */
  export type ProfileCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Profiles.
     */
    data: ProfileCreateManyInput | ProfileCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Profile createManyAndReturn
   */
  export type ProfileCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * The data used to create many Profiles.
     */
    data: ProfileCreateManyInput | ProfileCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Profile update
   */
  export type ProfileUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * The data needed to update a Profile.
     */
    data: XOR<ProfileUpdateInput, ProfileUncheckedUpdateInput>
    /**
     * Choose, which Profile to update.
     */
    where: ProfileWhereUniqueInput
  }

  /**
   * Profile updateMany
   */
  export type ProfileUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Profiles.
     */
    data: XOR<ProfileUpdateManyMutationInput, ProfileUncheckedUpdateManyInput>
    /**
     * Filter which Profiles to update
     */
    where?: ProfileWhereInput
    /**
     * Limit how many Profiles to update.
     */
    limit?: number
  }

  /**
   * Profile updateManyAndReturn
   */
  export type ProfileUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * The data used to update Profiles.
     */
    data: XOR<ProfileUpdateManyMutationInput, ProfileUncheckedUpdateManyInput>
    /**
     * Filter which Profiles to update
     */
    where?: ProfileWhereInput
    /**
     * Limit how many Profiles to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Profile upsert
   */
  export type ProfileUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * The filter to search for the Profile to update in case it exists.
     */
    where: ProfileWhereUniqueInput
    /**
     * In case the Profile found by the `where` argument doesn't exist, create a new Profile with this data.
     */
    create: XOR<ProfileCreateInput, ProfileUncheckedCreateInput>
    /**
     * In case the Profile was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProfileUpdateInput, ProfileUncheckedUpdateInput>
  }

  /**
   * Profile delete
   */
  export type ProfileDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * Filter which Profile to delete.
     */
    where: ProfileWhereUniqueInput
  }

  /**
   * Profile deleteMany
   */
  export type ProfileDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Profiles to delete
     */
    where?: ProfileWhereInput
    /**
     * Limit how many Profiles to delete.
     */
    limit?: number
  }

  /**
   * Profile without action
   */
  export type ProfileDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
  }


  /**
   * Model Resume
   */

  export type AggregateResume = {
    _count: ResumeCountAggregateOutputType | null
    _min: ResumeMinAggregateOutputType | null
    _max: ResumeMaxAggregateOutputType | null
  }

  export type ResumeMinAggregateOutputType = {
    id: string | null
    userId: string | null
    title: string | null
    createdAt: Date | null
  }

  export type ResumeMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    title: string | null
    createdAt: Date | null
  }

  export type ResumeCountAggregateOutputType = {
    id: number
    userId: number
    title: number
    createdAt: number
    _all: number
  }


  export type ResumeMinAggregateInputType = {
    id?: true
    userId?: true
    title?: true
    createdAt?: true
  }

  export type ResumeMaxAggregateInputType = {
    id?: true
    userId?: true
    title?: true
    createdAt?: true
  }

  export type ResumeCountAggregateInputType = {
    id?: true
    userId?: true
    title?: true
    createdAt?: true
    _all?: true
  }

  export type ResumeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Resume to aggregate.
     */
    where?: ResumeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Resumes to fetch.
     */
    orderBy?: ResumeOrderByWithRelationInput | ResumeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ResumeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Resumes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Resumes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Resumes
    **/
    _count?: true | ResumeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ResumeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ResumeMaxAggregateInputType
  }

  export type GetResumeAggregateType<T extends ResumeAggregateArgs> = {
        [P in keyof T & keyof AggregateResume]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateResume[P]>
      : GetScalarType<T[P], AggregateResume[P]>
  }




  export type ResumeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ResumeWhereInput
    orderBy?: ResumeOrderByWithAggregationInput | ResumeOrderByWithAggregationInput[]
    by: ResumeScalarFieldEnum[] | ResumeScalarFieldEnum
    having?: ResumeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ResumeCountAggregateInputType | true
    _min?: ResumeMinAggregateInputType
    _max?: ResumeMaxAggregateInputType
  }

  export type ResumeGroupByOutputType = {
    id: string
    userId: string
    title: string
    createdAt: Date
    _count: ResumeCountAggregateOutputType | null
    _min: ResumeMinAggregateOutputType | null
    _max: ResumeMaxAggregateOutputType | null
  }

  type GetResumeGroupByPayload<T extends ResumeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ResumeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ResumeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ResumeGroupByOutputType[P]>
            : GetScalarType<T[P], ResumeGroupByOutputType[P]>
        }
      >
    >


  export type ResumeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    title?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    versions?: boolean | Resume$versionsArgs<ExtArgs>
    _count?: boolean | ResumeCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["resume"]>

  export type ResumeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    title?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["resume"]>

  export type ResumeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    title?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["resume"]>

  export type ResumeSelectScalar = {
    id?: boolean
    userId?: boolean
    title?: boolean
    createdAt?: boolean
  }

  export type ResumeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "title" | "createdAt", ExtArgs["result"]["resume"]>
  export type ResumeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    versions?: boolean | Resume$versionsArgs<ExtArgs>
    _count?: boolean | ResumeCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ResumeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ResumeIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ResumePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Resume"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      versions: Prisma.$ResumeVersionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      title: string
      createdAt: Date
    }, ExtArgs["result"]["resume"]>
    composites: {}
  }

  type ResumeGetPayload<S extends boolean | null | undefined | ResumeDefaultArgs> = $Result.GetResult<Prisma.$ResumePayload, S>

  type ResumeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ResumeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ResumeCountAggregateInputType | true
    }

  export interface ResumeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Resume'], meta: { name: 'Resume' } }
    /**
     * Find zero or one Resume that matches the filter.
     * @param {ResumeFindUniqueArgs} args - Arguments to find a Resume
     * @example
     * // Get one Resume
     * const resume = await prisma.resume.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ResumeFindUniqueArgs>(args: SelectSubset<T, ResumeFindUniqueArgs<ExtArgs>>): Prisma__ResumeClient<$Result.GetResult<Prisma.$ResumePayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one Resume that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ResumeFindUniqueOrThrowArgs} args - Arguments to find a Resume
     * @example
     * // Get one Resume
     * const resume = await prisma.resume.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ResumeFindUniqueOrThrowArgs>(args: SelectSubset<T, ResumeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ResumeClient<$Result.GetResult<Prisma.$ResumePayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first Resume that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResumeFindFirstArgs} args - Arguments to find a Resume
     * @example
     * // Get one Resume
     * const resume = await prisma.resume.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ResumeFindFirstArgs>(args?: SelectSubset<T, ResumeFindFirstArgs<ExtArgs>>): Prisma__ResumeClient<$Result.GetResult<Prisma.$ResumePayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first Resume that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResumeFindFirstOrThrowArgs} args - Arguments to find a Resume
     * @example
     * // Get one Resume
     * const resume = await prisma.resume.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ResumeFindFirstOrThrowArgs>(args?: SelectSubset<T, ResumeFindFirstOrThrowArgs<ExtArgs>>): Prisma__ResumeClient<$Result.GetResult<Prisma.$ResumePayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more Resumes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResumeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Resumes
     * const resumes = await prisma.resume.findMany()
     * 
     * // Get first 10 Resumes
     * const resumes = await prisma.resume.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const resumeWithIdOnly = await prisma.resume.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ResumeFindManyArgs>(args?: SelectSubset<T, ResumeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResumePayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a Resume.
     * @param {ResumeCreateArgs} args - Arguments to create a Resume.
     * @example
     * // Create one Resume
     * const Resume = await prisma.resume.create({
     *   data: {
     *     // ... data to create a Resume
     *   }
     * })
     * 
     */
    create<T extends ResumeCreateArgs>(args: SelectSubset<T, ResumeCreateArgs<ExtArgs>>): Prisma__ResumeClient<$Result.GetResult<Prisma.$ResumePayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many Resumes.
     * @param {ResumeCreateManyArgs} args - Arguments to create many Resumes.
     * @example
     * // Create many Resumes
     * const resume = await prisma.resume.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ResumeCreateManyArgs>(args?: SelectSubset<T, ResumeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Resumes and returns the data saved in the database.
     * @param {ResumeCreateManyAndReturnArgs} args - Arguments to create many Resumes.
     * @example
     * // Create many Resumes
     * const resume = await prisma.resume.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Resumes and only return the `id`
     * const resumeWithIdOnly = await prisma.resume.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ResumeCreateManyAndReturnArgs>(args?: SelectSubset<T, ResumeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResumePayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a Resume.
     * @param {ResumeDeleteArgs} args - Arguments to delete one Resume.
     * @example
     * // Delete one Resume
     * const Resume = await prisma.resume.delete({
     *   where: {
     *     // ... filter to delete one Resume
     *   }
     * })
     * 
     */
    delete<T extends ResumeDeleteArgs>(args: SelectSubset<T, ResumeDeleteArgs<ExtArgs>>): Prisma__ResumeClient<$Result.GetResult<Prisma.$ResumePayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one Resume.
     * @param {ResumeUpdateArgs} args - Arguments to update one Resume.
     * @example
     * // Update one Resume
     * const resume = await prisma.resume.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ResumeUpdateArgs>(args: SelectSubset<T, ResumeUpdateArgs<ExtArgs>>): Prisma__ResumeClient<$Result.GetResult<Prisma.$ResumePayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more Resumes.
     * @param {ResumeDeleteManyArgs} args - Arguments to filter Resumes to delete.
     * @example
     * // Delete a few Resumes
     * const { count } = await prisma.resume.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ResumeDeleteManyArgs>(args?: SelectSubset<T, ResumeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Resumes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResumeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Resumes
     * const resume = await prisma.resume.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ResumeUpdateManyArgs>(args: SelectSubset<T, ResumeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Resumes and returns the data updated in the database.
     * @param {ResumeUpdateManyAndReturnArgs} args - Arguments to update many Resumes.
     * @example
     * // Update many Resumes
     * const resume = await prisma.resume.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Resumes and only return the `id`
     * const resumeWithIdOnly = await prisma.resume.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ResumeUpdateManyAndReturnArgs>(args: SelectSubset<T, ResumeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResumePayload<ExtArgs>, T, "updateManyAndReturn", ClientOptions>>

    /**
     * Create or update one Resume.
     * @param {ResumeUpsertArgs} args - Arguments to update or create a Resume.
     * @example
     * // Update or create a Resume
     * const resume = await prisma.resume.upsert({
     *   create: {
     *     // ... data to create a Resume
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Resume we want to update
     *   }
     * })
     */
    upsert<T extends ResumeUpsertArgs>(args: SelectSubset<T, ResumeUpsertArgs<ExtArgs>>): Prisma__ResumeClient<$Result.GetResult<Prisma.$ResumePayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of Resumes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResumeCountArgs} args - Arguments to filter Resumes to count.
     * @example
     * // Count the number of Resumes
     * const count = await prisma.resume.count({
     *   where: {
     *     // ... the filter for the Resumes we want to count
     *   }
     * })
    **/
    count<T extends ResumeCountArgs>(
      args?: Subset<T, ResumeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ResumeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Resume.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResumeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ResumeAggregateArgs>(args: Subset<T, ResumeAggregateArgs>): Prisma.PrismaPromise<GetResumeAggregateType<T>>

    /**
     * Group by Resume.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResumeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ResumeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ResumeGroupByArgs['orderBy'] }
        : { orderBy?: ResumeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ResumeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetResumeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Resume model
   */
  readonly fields: ResumeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Resume.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ResumeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | Null, Null, ExtArgs, ClientOptions>
    versions<T extends Resume$versionsArgs<ExtArgs> = {}>(args?: Subset<T, Resume$versionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResumeVersionPayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Resume model
   */ 
  interface ResumeFieldRefs {
    readonly id: FieldRef<"Resume", 'String'>
    readonly userId: FieldRef<"Resume", 'String'>
    readonly title: FieldRef<"Resume", 'String'>
    readonly createdAt: FieldRef<"Resume", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Resume findUnique
   */
  export type ResumeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resume
     */
    select?: ResumeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resume
     */
    omit?: ResumeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeInclude<ExtArgs> | null
    /**
     * Filter, which Resume to fetch.
     */
    where: ResumeWhereUniqueInput
  }

  /**
   * Resume findUniqueOrThrow
   */
  export type ResumeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resume
     */
    select?: ResumeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resume
     */
    omit?: ResumeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeInclude<ExtArgs> | null
    /**
     * Filter, which Resume to fetch.
     */
    where: ResumeWhereUniqueInput
  }

  /**
   * Resume findFirst
   */
  export type ResumeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resume
     */
    select?: ResumeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resume
     */
    omit?: ResumeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeInclude<ExtArgs> | null
    /**
     * Filter, which Resume to fetch.
     */
    where?: ResumeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Resumes to fetch.
     */
    orderBy?: ResumeOrderByWithRelationInput | ResumeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Resumes.
     */
    cursor?: ResumeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Resumes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Resumes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Resumes.
     */
    distinct?: ResumeScalarFieldEnum | ResumeScalarFieldEnum[]
  }

  /**
   * Resume findFirstOrThrow
   */
  export type ResumeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resume
     */
    select?: ResumeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resume
     */
    omit?: ResumeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeInclude<ExtArgs> | null
    /**
     * Filter, which Resume to fetch.
     */
    where?: ResumeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Resumes to fetch.
     */
    orderBy?: ResumeOrderByWithRelationInput | ResumeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Resumes.
     */
    cursor?: ResumeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Resumes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Resumes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Resumes.
     */
    distinct?: ResumeScalarFieldEnum | ResumeScalarFieldEnum[]
  }

  /**
   * Resume findMany
   */
  export type ResumeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resume
     */
    select?: ResumeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resume
     */
    omit?: ResumeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeInclude<ExtArgs> | null
    /**
     * Filter, which Resumes to fetch.
     */
    where?: ResumeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Resumes to fetch.
     */
    orderBy?: ResumeOrderByWithRelationInput | ResumeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Resumes.
     */
    cursor?: ResumeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Resumes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Resumes.
     */
    skip?: number
    distinct?: ResumeScalarFieldEnum | ResumeScalarFieldEnum[]
  }

  /**
   * Resume create
   */
  export type ResumeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resume
     */
    select?: ResumeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resume
     */
    omit?: ResumeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeInclude<ExtArgs> | null
    /**
     * The data needed to create a Resume.
     */
    data: XOR<ResumeCreateInput, ResumeUncheckedCreateInput>
  }

  /**
   * Resume createMany
   */
  export type ResumeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Resumes.
     */
    data: ResumeCreateManyInput | ResumeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Resume createManyAndReturn
   */
  export type ResumeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resume
     */
    select?: ResumeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Resume
     */
    omit?: ResumeOmit<ExtArgs> | null
    /**
     * The data used to create many Resumes.
     */
    data: ResumeCreateManyInput | ResumeCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Resume update
   */
  export type ResumeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resume
     */
    select?: ResumeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resume
     */
    omit?: ResumeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeInclude<ExtArgs> | null
    /**
     * The data needed to update a Resume.
     */
    data: XOR<ResumeUpdateInput, ResumeUncheckedUpdateInput>
    /**
     * Choose, which Resume to update.
     */
    where: ResumeWhereUniqueInput
  }

  /**
   * Resume updateMany
   */
  export type ResumeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Resumes.
     */
    data: XOR<ResumeUpdateManyMutationInput, ResumeUncheckedUpdateManyInput>
    /**
     * Filter which Resumes to update
     */
    where?: ResumeWhereInput
    /**
     * Limit how many Resumes to update.
     */
    limit?: number
  }

  /**
   * Resume updateManyAndReturn
   */
  export type ResumeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resume
     */
    select?: ResumeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Resume
     */
    omit?: ResumeOmit<ExtArgs> | null
    /**
     * The data used to update Resumes.
     */
    data: XOR<ResumeUpdateManyMutationInput, ResumeUncheckedUpdateManyInput>
    /**
     * Filter which Resumes to update
     */
    where?: ResumeWhereInput
    /**
     * Limit how many Resumes to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Resume upsert
   */
  export type ResumeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resume
     */
    select?: ResumeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resume
     */
    omit?: ResumeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeInclude<ExtArgs> | null
    /**
     * The filter to search for the Resume to update in case it exists.
     */
    where: ResumeWhereUniqueInput
    /**
     * In case the Resume found by the `where` argument doesn't exist, create a new Resume with this data.
     */
    create: XOR<ResumeCreateInput, ResumeUncheckedCreateInput>
    /**
     * In case the Resume was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ResumeUpdateInput, ResumeUncheckedUpdateInput>
  }

  /**
   * Resume delete
   */
  export type ResumeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resume
     */
    select?: ResumeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resume
     */
    omit?: ResumeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeInclude<ExtArgs> | null
    /**
     * Filter which Resume to delete.
     */
    where: ResumeWhereUniqueInput
  }

  /**
   * Resume deleteMany
   */
  export type ResumeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Resumes to delete
     */
    where?: ResumeWhereInput
    /**
     * Limit how many Resumes to delete.
     */
    limit?: number
  }

  /**
   * Resume.versions
   */
  export type Resume$versionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResumeVersion
     */
    select?: ResumeVersionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResumeVersion
     */
    omit?: ResumeVersionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeVersionInclude<ExtArgs> | null
    where?: ResumeVersionWhereInput
    orderBy?: ResumeVersionOrderByWithRelationInput | ResumeVersionOrderByWithRelationInput[]
    cursor?: ResumeVersionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ResumeVersionScalarFieldEnum | ResumeVersionScalarFieldEnum[]
  }

  /**
   * Resume without action
   */
  export type ResumeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resume
     */
    select?: ResumeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resume
     */
    omit?: ResumeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeInclude<ExtArgs> | null
  }


  /**
   * Model ResumeVersion
   */

  export type AggregateResumeVersion = {
    _count: ResumeVersionCountAggregateOutputType | null
    _avg: ResumeVersionAvgAggregateOutputType | null
    _sum: ResumeVersionSumAggregateOutputType | null
    _min: ResumeVersionMinAggregateOutputType | null
    _max: ResumeVersionMaxAggregateOutputType | null
  }

  export type ResumeVersionAvgAggregateOutputType = {
    versionNo: number | null
  }

  export type ResumeVersionSumAggregateOutputType = {
    versionNo: number | null
  }

  export type ResumeVersionMinAggregateOutputType = {
    id: string | null
    resumeId: string | null
    fileUrl: string | null
    extractedText: string | null
    versionNo: number | null
    createdAt: Date | null
  }

  export type ResumeVersionMaxAggregateOutputType = {
    id: string | null
    resumeId: string | null
    fileUrl: string | null
    extractedText: string | null
    versionNo: number | null
    createdAt: Date | null
  }

  export type ResumeVersionCountAggregateOutputType = {
    id: number
    resumeId: number
    fileUrl: number
    extractedText: number
    versionNo: number
    createdAt: number
    _all: number
  }


  export type ResumeVersionAvgAggregateInputType = {
    versionNo?: true
  }

  export type ResumeVersionSumAggregateInputType = {
    versionNo?: true
  }

  export type ResumeVersionMinAggregateInputType = {
    id?: true
    resumeId?: true
    fileUrl?: true
    extractedText?: true
    versionNo?: true
    createdAt?: true
  }

  export type ResumeVersionMaxAggregateInputType = {
    id?: true
    resumeId?: true
    fileUrl?: true
    extractedText?: true
    versionNo?: true
    createdAt?: true
  }

  export type ResumeVersionCountAggregateInputType = {
    id?: true
    resumeId?: true
    fileUrl?: true
    extractedText?: true
    versionNo?: true
    createdAt?: true
    _all?: true
  }

  export type ResumeVersionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ResumeVersion to aggregate.
     */
    where?: ResumeVersionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ResumeVersions to fetch.
     */
    orderBy?: ResumeVersionOrderByWithRelationInput | ResumeVersionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ResumeVersionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ResumeVersions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ResumeVersions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ResumeVersions
    **/
    _count?: true | ResumeVersionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ResumeVersionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ResumeVersionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ResumeVersionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ResumeVersionMaxAggregateInputType
  }

  export type GetResumeVersionAggregateType<T extends ResumeVersionAggregateArgs> = {
        [P in keyof T & keyof AggregateResumeVersion]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateResumeVersion[P]>
      : GetScalarType<T[P], AggregateResumeVersion[P]>
  }




  export type ResumeVersionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ResumeVersionWhereInput
    orderBy?: ResumeVersionOrderByWithAggregationInput | ResumeVersionOrderByWithAggregationInput[]
    by: ResumeVersionScalarFieldEnum[] | ResumeVersionScalarFieldEnum
    having?: ResumeVersionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ResumeVersionCountAggregateInputType | true
    _avg?: ResumeVersionAvgAggregateInputType
    _sum?: ResumeVersionSumAggregateInputType
    _min?: ResumeVersionMinAggregateInputType
    _max?: ResumeVersionMaxAggregateInputType
  }

  export type ResumeVersionGroupByOutputType = {
    id: string
    resumeId: string
    fileUrl: string
    extractedText: string
    versionNo: number
    createdAt: Date
    _count: ResumeVersionCountAggregateOutputType | null
    _avg: ResumeVersionAvgAggregateOutputType | null
    _sum: ResumeVersionSumAggregateOutputType | null
    _min: ResumeVersionMinAggregateOutputType | null
    _max: ResumeVersionMaxAggregateOutputType | null
  }

  type GetResumeVersionGroupByPayload<T extends ResumeVersionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ResumeVersionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ResumeVersionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ResumeVersionGroupByOutputType[P]>
            : GetScalarType<T[P], ResumeVersionGroupByOutputType[P]>
        }
      >
    >


  export type ResumeVersionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    resumeId?: boolean
    fileUrl?: boolean
    extractedText?: boolean
    versionNo?: boolean
    createdAt?: boolean
    resume?: boolean | ResumeDefaultArgs<ExtArgs>
    analysis?: boolean | ResumeVersion$analysisArgs<ExtArgs>
  }, ExtArgs["result"]["resumeVersion"]>

  export type ResumeVersionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    resumeId?: boolean
    fileUrl?: boolean
    extractedText?: boolean
    versionNo?: boolean
    createdAt?: boolean
    resume?: boolean | ResumeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["resumeVersion"]>

  export type ResumeVersionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    resumeId?: boolean
    fileUrl?: boolean
    extractedText?: boolean
    versionNo?: boolean
    createdAt?: boolean
    resume?: boolean | ResumeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["resumeVersion"]>

  export type ResumeVersionSelectScalar = {
    id?: boolean
    resumeId?: boolean
    fileUrl?: boolean
    extractedText?: boolean
    versionNo?: boolean
    createdAt?: boolean
  }

  export type ResumeVersionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "resumeId" | "fileUrl" | "extractedText" | "versionNo" | "createdAt", ExtArgs["result"]["resumeVersion"]>
  export type ResumeVersionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    resume?: boolean | ResumeDefaultArgs<ExtArgs>
    analysis?: boolean | ResumeVersion$analysisArgs<ExtArgs>
  }
  export type ResumeVersionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    resume?: boolean | ResumeDefaultArgs<ExtArgs>
  }
  export type ResumeVersionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    resume?: boolean | ResumeDefaultArgs<ExtArgs>
  }

  export type $ResumeVersionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ResumeVersion"
    objects: {
      resume: Prisma.$ResumePayload<ExtArgs>
      analysis: Prisma.$ResumeAnalysisPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      resumeId: string
      fileUrl: string
      extractedText: string
      versionNo: number
      createdAt: Date
    }, ExtArgs["result"]["resumeVersion"]>
    composites: {}
  }

  type ResumeVersionGetPayload<S extends boolean | null | undefined | ResumeVersionDefaultArgs> = $Result.GetResult<Prisma.$ResumeVersionPayload, S>

  type ResumeVersionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ResumeVersionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ResumeVersionCountAggregateInputType | true
    }

  export interface ResumeVersionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ResumeVersion'], meta: { name: 'ResumeVersion' } }
    /**
     * Find zero or one ResumeVersion that matches the filter.
     * @param {ResumeVersionFindUniqueArgs} args - Arguments to find a ResumeVersion
     * @example
     * // Get one ResumeVersion
     * const resumeVersion = await prisma.resumeVersion.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ResumeVersionFindUniqueArgs>(args: SelectSubset<T, ResumeVersionFindUniqueArgs<ExtArgs>>): Prisma__ResumeVersionClient<$Result.GetResult<Prisma.$ResumeVersionPayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one ResumeVersion that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ResumeVersionFindUniqueOrThrowArgs} args - Arguments to find a ResumeVersion
     * @example
     * // Get one ResumeVersion
     * const resumeVersion = await prisma.resumeVersion.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ResumeVersionFindUniqueOrThrowArgs>(args: SelectSubset<T, ResumeVersionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ResumeVersionClient<$Result.GetResult<Prisma.$ResumeVersionPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first ResumeVersion that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResumeVersionFindFirstArgs} args - Arguments to find a ResumeVersion
     * @example
     * // Get one ResumeVersion
     * const resumeVersion = await prisma.resumeVersion.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ResumeVersionFindFirstArgs>(args?: SelectSubset<T, ResumeVersionFindFirstArgs<ExtArgs>>): Prisma__ResumeVersionClient<$Result.GetResult<Prisma.$ResumeVersionPayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first ResumeVersion that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResumeVersionFindFirstOrThrowArgs} args - Arguments to find a ResumeVersion
     * @example
     * // Get one ResumeVersion
     * const resumeVersion = await prisma.resumeVersion.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ResumeVersionFindFirstOrThrowArgs>(args?: SelectSubset<T, ResumeVersionFindFirstOrThrowArgs<ExtArgs>>): Prisma__ResumeVersionClient<$Result.GetResult<Prisma.$ResumeVersionPayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more ResumeVersions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResumeVersionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ResumeVersions
     * const resumeVersions = await prisma.resumeVersion.findMany()
     * 
     * // Get first 10 ResumeVersions
     * const resumeVersions = await prisma.resumeVersion.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const resumeVersionWithIdOnly = await prisma.resumeVersion.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ResumeVersionFindManyArgs>(args?: SelectSubset<T, ResumeVersionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResumeVersionPayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a ResumeVersion.
     * @param {ResumeVersionCreateArgs} args - Arguments to create a ResumeVersion.
     * @example
     * // Create one ResumeVersion
     * const ResumeVersion = await prisma.resumeVersion.create({
     *   data: {
     *     // ... data to create a ResumeVersion
     *   }
     * })
     * 
     */
    create<T extends ResumeVersionCreateArgs>(args: SelectSubset<T, ResumeVersionCreateArgs<ExtArgs>>): Prisma__ResumeVersionClient<$Result.GetResult<Prisma.$ResumeVersionPayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many ResumeVersions.
     * @param {ResumeVersionCreateManyArgs} args - Arguments to create many ResumeVersions.
     * @example
     * // Create many ResumeVersions
     * const resumeVersion = await prisma.resumeVersion.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ResumeVersionCreateManyArgs>(args?: SelectSubset<T, ResumeVersionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ResumeVersions and returns the data saved in the database.
     * @param {ResumeVersionCreateManyAndReturnArgs} args - Arguments to create many ResumeVersions.
     * @example
     * // Create many ResumeVersions
     * const resumeVersion = await prisma.resumeVersion.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ResumeVersions and only return the `id`
     * const resumeVersionWithIdOnly = await prisma.resumeVersion.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ResumeVersionCreateManyAndReturnArgs>(args?: SelectSubset<T, ResumeVersionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResumeVersionPayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a ResumeVersion.
     * @param {ResumeVersionDeleteArgs} args - Arguments to delete one ResumeVersion.
     * @example
     * // Delete one ResumeVersion
     * const ResumeVersion = await prisma.resumeVersion.delete({
     *   where: {
     *     // ... filter to delete one ResumeVersion
     *   }
     * })
     * 
     */
    delete<T extends ResumeVersionDeleteArgs>(args: SelectSubset<T, ResumeVersionDeleteArgs<ExtArgs>>): Prisma__ResumeVersionClient<$Result.GetResult<Prisma.$ResumeVersionPayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one ResumeVersion.
     * @param {ResumeVersionUpdateArgs} args - Arguments to update one ResumeVersion.
     * @example
     * // Update one ResumeVersion
     * const resumeVersion = await prisma.resumeVersion.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ResumeVersionUpdateArgs>(args: SelectSubset<T, ResumeVersionUpdateArgs<ExtArgs>>): Prisma__ResumeVersionClient<$Result.GetResult<Prisma.$ResumeVersionPayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more ResumeVersions.
     * @param {ResumeVersionDeleteManyArgs} args - Arguments to filter ResumeVersions to delete.
     * @example
     * // Delete a few ResumeVersions
     * const { count } = await prisma.resumeVersion.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ResumeVersionDeleteManyArgs>(args?: SelectSubset<T, ResumeVersionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ResumeVersions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResumeVersionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ResumeVersions
     * const resumeVersion = await prisma.resumeVersion.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ResumeVersionUpdateManyArgs>(args: SelectSubset<T, ResumeVersionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ResumeVersions and returns the data updated in the database.
     * @param {ResumeVersionUpdateManyAndReturnArgs} args - Arguments to update many ResumeVersions.
     * @example
     * // Update many ResumeVersions
     * const resumeVersion = await prisma.resumeVersion.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ResumeVersions and only return the `id`
     * const resumeVersionWithIdOnly = await prisma.resumeVersion.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ResumeVersionUpdateManyAndReturnArgs>(args: SelectSubset<T, ResumeVersionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResumeVersionPayload<ExtArgs>, T, "updateManyAndReturn", ClientOptions>>

    /**
     * Create or update one ResumeVersion.
     * @param {ResumeVersionUpsertArgs} args - Arguments to update or create a ResumeVersion.
     * @example
     * // Update or create a ResumeVersion
     * const resumeVersion = await prisma.resumeVersion.upsert({
     *   create: {
     *     // ... data to create a ResumeVersion
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ResumeVersion we want to update
     *   }
     * })
     */
    upsert<T extends ResumeVersionUpsertArgs>(args: SelectSubset<T, ResumeVersionUpsertArgs<ExtArgs>>): Prisma__ResumeVersionClient<$Result.GetResult<Prisma.$ResumeVersionPayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of ResumeVersions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResumeVersionCountArgs} args - Arguments to filter ResumeVersions to count.
     * @example
     * // Count the number of ResumeVersions
     * const count = await prisma.resumeVersion.count({
     *   where: {
     *     // ... the filter for the ResumeVersions we want to count
     *   }
     * })
    **/
    count<T extends ResumeVersionCountArgs>(
      args?: Subset<T, ResumeVersionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ResumeVersionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ResumeVersion.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResumeVersionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ResumeVersionAggregateArgs>(args: Subset<T, ResumeVersionAggregateArgs>): Prisma.PrismaPromise<GetResumeVersionAggregateType<T>>

    /**
     * Group by ResumeVersion.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResumeVersionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ResumeVersionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ResumeVersionGroupByArgs['orderBy'] }
        : { orderBy?: ResumeVersionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ResumeVersionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetResumeVersionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ResumeVersion model
   */
  readonly fields: ResumeVersionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ResumeVersion.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ResumeVersionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    resume<T extends ResumeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ResumeDefaultArgs<ExtArgs>>): Prisma__ResumeClient<$Result.GetResult<Prisma.$ResumePayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | Null, Null, ExtArgs, ClientOptions>
    analysis<T extends ResumeVersion$analysisArgs<ExtArgs> = {}>(args?: Subset<T, ResumeVersion$analysisArgs<ExtArgs>>): Prisma__ResumeAnalysisClient<$Result.GetResult<Prisma.$ResumeAnalysisPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | null, null, ExtArgs, ClientOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ResumeVersion model
   */ 
  interface ResumeVersionFieldRefs {
    readonly id: FieldRef<"ResumeVersion", 'String'>
    readonly resumeId: FieldRef<"ResumeVersion", 'String'>
    readonly fileUrl: FieldRef<"ResumeVersion", 'String'>
    readonly extractedText: FieldRef<"ResumeVersion", 'String'>
    readonly versionNo: FieldRef<"ResumeVersion", 'Int'>
    readonly createdAt: FieldRef<"ResumeVersion", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ResumeVersion findUnique
   */
  export type ResumeVersionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResumeVersion
     */
    select?: ResumeVersionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResumeVersion
     */
    omit?: ResumeVersionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeVersionInclude<ExtArgs> | null
    /**
     * Filter, which ResumeVersion to fetch.
     */
    where: ResumeVersionWhereUniqueInput
  }

  /**
   * ResumeVersion findUniqueOrThrow
   */
  export type ResumeVersionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResumeVersion
     */
    select?: ResumeVersionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResumeVersion
     */
    omit?: ResumeVersionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeVersionInclude<ExtArgs> | null
    /**
     * Filter, which ResumeVersion to fetch.
     */
    where: ResumeVersionWhereUniqueInput
  }

  /**
   * ResumeVersion findFirst
   */
  export type ResumeVersionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResumeVersion
     */
    select?: ResumeVersionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResumeVersion
     */
    omit?: ResumeVersionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeVersionInclude<ExtArgs> | null
    /**
     * Filter, which ResumeVersion to fetch.
     */
    where?: ResumeVersionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ResumeVersions to fetch.
     */
    orderBy?: ResumeVersionOrderByWithRelationInput | ResumeVersionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ResumeVersions.
     */
    cursor?: ResumeVersionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ResumeVersions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ResumeVersions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ResumeVersions.
     */
    distinct?: ResumeVersionScalarFieldEnum | ResumeVersionScalarFieldEnum[]
  }

  /**
   * ResumeVersion findFirstOrThrow
   */
  export type ResumeVersionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResumeVersion
     */
    select?: ResumeVersionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResumeVersion
     */
    omit?: ResumeVersionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeVersionInclude<ExtArgs> | null
    /**
     * Filter, which ResumeVersion to fetch.
     */
    where?: ResumeVersionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ResumeVersions to fetch.
     */
    orderBy?: ResumeVersionOrderByWithRelationInput | ResumeVersionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ResumeVersions.
     */
    cursor?: ResumeVersionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ResumeVersions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ResumeVersions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ResumeVersions.
     */
    distinct?: ResumeVersionScalarFieldEnum | ResumeVersionScalarFieldEnum[]
  }

  /**
   * ResumeVersion findMany
   */
  export type ResumeVersionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResumeVersion
     */
    select?: ResumeVersionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResumeVersion
     */
    omit?: ResumeVersionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeVersionInclude<ExtArgs> | null
    /**
     * Filter, which ResumeVersions to fetch.
     */
    where?: ResumeVersionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ResumeVersions to fetch.
     */
    orderBy?: ResumeVersionOrderByWithRelationInput | ResumeVersionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ResumeVersions.
     */
    cursor?: ResumeVersionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ResumeVersions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ResumeVersions.
     */
    skip?: number
    distinct?: ResumeVersionScalarFieldEnum | ResumeVersionScalarFieldEnum[]
  }

  /**
   * ResumeVersion create
   */
  export type ResumeVersionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResumeVersion
     */
    select?: ResumeVersionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResumeVersion
     */
    omit?: ResumeVersionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeVersionInclude<ExtArgs> | null
    /**
     * The data needed to create a ResumeVersion.
     */
    data: XOR<ResumeVersionCreateInput, ResumeVersionUncheckedCreateInput>
  }

  /**
   * ResumeVersion createMany
   */
  export type ResumeVersionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ResumeVersions.
     */
    data: ResumeVersionCreateManyInput | ResumeVersionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ResumeVersion createManyAndReturn
   */
  export type ResumeVersionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResumeVersion
     */
    select?: ResumeVersionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ResumeVersion
     */
    omit?: ResumeVersionOmit<ExtArgs> | null
    /**
     * The data used to create many ResumeVersions.
     */
    data: ResumeVersionCreateManyInput | ResumeVersionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeVersionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ResumeVersion update
   */
  export type ResumeVersionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResumeVersion
     */
    select?: ResumeVersionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResumeVersion
     */
    omit?: ResumeVersionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeVersionInclude<ExtArgs> | null
    /**
     * The data needed to update a ResumeVersion.
     */
    data: XOR<ResumeVersionUpdateInput, ResumeVersionUncheckedUpdateInput>
    /**
     * Choose, which ResumeVersion to update.
     */
    where: ResumeVersionWhereUniqueInput
  }

  /**
   * ResumeVersion updateMany
   */
  export type ResumeVersionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ResumeVersions.
     */
    data: XOR<ResumeVersionUpdateManyMutationInput, ResumeVersionUncheckedUpdateManyInput>
    /**
     * Filter which ResumeVersions to update
     */
    where?: ResumeVersionWhereInput
    /**
     * Limit how many ResumeVersions to update.
     */
    limit?: number
  }

  /**
   * ResumeVersion updateManyAndReturn
   */
  export type ResumeVersionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResumeVersion
     */
    select?: ResumeVersionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ResumeVersion
     */
    omit?: ResumeVersionOmit<ExtArgs> | null
    /**
     * The data used to update ResumeVersions.
     */
    data: XOR<ResumeVersionUpdateManyMutationInput, ResumeVersionUncheckedUpdateManyInput>
    /**
     * Filter which ResumeVersions to update
     */
    where?: ResumeVersionWhereInput
    /**
     * Limit how many ResumeVersions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeVersionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ResumeVersion upsert
   */
  export type ResumeVersionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResumeVersion
     */
    select?: ResumeVersionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResumeVersion
     */
    omit?: ResumeVersionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeVersionInclude<ExtArgs> | null
    /**
     * The filter to search for the ResumeVersion to update in case it exists.
     */
    where: ResumeVersionWhereUniqueInput
    /**
     * In case the ResumeVersion found by the `where` argument doesn't exist, create a new ResumeVersion with this data.
     */
    create: XOR<ResumeVersionCreateInput, ResumeVersionUncheckedCreateInput>
    /**
     * In case the ResumeVersion was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ResumeVersionUpdateInput, ResumeVersionUncheckedUpdateInput>
  }

  /**
   * ResumeVersion delete
   */
  export type ResumeVersionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResumeVersion
     */
    select?: ResumeVersionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResumeVersion
     */
    omit?: ResumeVersionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeVersionInclude<ExtArgs> | null
    /**
     * Filter which ResumeVersion to delete.
     */
    where: ResumeVersionWhereUniqueInput
  }

  /**
   * ResumeVersion deleteMany
   */
  export type ResumeVersionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ResumeVersions to delete
     */
    where?: ResumeVersionWhereInput
    /**
     * Limit how many ResumeVersions to delete.
     */
    limit?: number
  }

  /**
   * ResumeVersion.analysis
   */
  export type ResumeVersion$analysisArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResumeAnalysis
     */
    select?: ResumeAnalysisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResumeAnalysis
     */
    omit?: ResumeAnalysisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeAnalysisInclude<ExtArgs> | null
    where?: ResumeAnalysisWhereInput
  }

  /**
   * ResumeVersion without action
   */
  export type ResumeVersionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResumeVersion
     */
    select?: ResumeVersionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResumeVersion
     */
    omit?: ResumeVersionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeVersionInclude<ExtArgs> | null
  }


  /**
   * Model ResumeAnalysis
   */

  export type AggregateResumeAnalysis = {
    _count: ResumeAnalysisCountAggregateOutputType | null
    _avg: ResumeAnalysisAvgAggregateOutputType | null
    _sum: ResumeAnalysisSumAggregateOutputType | null
    _min: ResumeAnalysisMinAggregateOutputType | null
    _max: ResumeAnalysisMaxAggregateOutputType | null
  }

  export type ResumeAnalysisAvgAggregateOutputType = {
    atsScore: number | null
  }

  export type ResumeAnalysisSumAggregateOutputType = {
    atsScore: number | null
  }

  export type ResumeAnalysisMinAggregateOutputType = {
    id: string | null
    resumeVersionId: string | null
    atsScore: number | null
    compatibilityText: string | null
    createdAt: Date | null
  }

  export type ResumeAnalysisMaxAggregateOutputType = {
    id: string | null
    resumeVersionId: string | null
    atsScore: number | null
    compatibilityText: string | null
    createdAt: Date | null
  }

  export type ResumeAnalysisCountAggregateOutputType = {
    id: number
    resumeVersionId: number
    atsScore: number
    compatibilityText: number
    suggestions: number
    missingKeywords: number
    createdAt: number
    _all: number
  }


  export type ResumeAnalysisAvgAggregateInputType = {
    atsScore?: true
  }

  export type ResumeAnalysisSumAggregateInputType = {
    atsScore?: true
  }

  export type ResumeAnalysisMinAggregateInputType = {
    id?: true
    resumeVersionId?: true
    atsScore?: true
    compatibilityText?: true
    createdAt?: true
  }

  export type ResumeAnalysisMaxAggregateInputType = {
    id?: true
    resumeVersionId?: true
    atsScore?: true
    compatibilityText?: true
    createdAt?: true
  }

  export type ResumeAnalysisCountAggregateInputType = {
    id?: true
    resumeVersionId?: true
    atsScore?: true
    compatibilityText?: true
    suggestions?: true
    missingKeywords?: true
    createdAt?: true
    _all?: true
  }

  export type ResumeAnalysisAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ResumeAnalysis to aggregate.
     */
    where?: ResumeAnalysisWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ResumeAnalyses to fetch.
     */
    orderBy?: ResumeAnalysisOrderByWithRelationInput | ResumeAnalysisOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ResumeAnalysisWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ResumeAnalyses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ResumeAnalyses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ResumeAnalyses
    **/
    _count?: true | ResumeAnalysisCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ResumeAnalysisAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ResumeAnalysisSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ResumeAnalysisMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ResumeAnalysisMaxAggregateInputType
  }

  export type GetResumeAnalysisAggregateType<T extends ResumeAnalysisAggregateArgs> = {
        [P in keyof T & keyof AggregateResumeAnalysis]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateResumeAnalysis[P]>
      : GetScalarType<T[P], AggregateResumeAnalysis[P]>
  }




  export type ResumeAnalysisGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ResumeAnalysisWhereInput
    orderBy?: ResumeAnalysisOrderByWithAggregationInput | ResumeAnalysisOrderByWithAggregationInput[]
    by: ResumeAnalysisScalarFieldEnum[] | ResumeAnalysisScalarFieldEnum
    having?: ResumeAnalysisScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ResumeAnalysisCountAggregateInputType | true
    _avg?: ResumeAnalysisAvgAggregateInputType
    _sum?: ResumeAnalysisSumAggregateInputType
    _min?: ResumeAnalysisMinAggregateInputType
    _max?: ResumeAnalysisMaxAggregateInputType
  }

  export type ResumeAnalysisGroupByOutputType = {
    id: string
    resumeVersionId: string
    atsScore: number
    compatibilityText: string
    suggestions: JsonValue
    missingKeywords: string[]
    createdAt: Date
    _count: ResumeAnalysisCountAggregateOutputType | null
    _avg: ResumeAnalysisAvgAggregateOutputType | null
    _sum: ResumeAnalysisSumAggregateOutputType | null
    _min: ResumeAnalysisMinAggregateOutputType | null
    _max: ResumeAnalysisMaxAggregateOutputType | null
  }

  type GetResumeAnalysisGroupByPayload<T extends ResumeAnalysisGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ResumeAnalysisGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ResumeAnalysisGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ResumeAnalysisGroupByOutputType[P]>
            : GetScalarType<T[P], ResumeAnalysisGroupByOutputType[P]>
        }
      >
    >


  export type ResumeAnalysisSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    resumeVersionId?: boolean
    atsScore?: boolean
    compatibilityText?: boolean
    suggestions?: boolean
    missingKeywords?: boolean
    createdAt?: boolean
    resumeVersion?: boolean | ResumeVersionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["resumeAnalysis"]>

  export type ResumeAnalysisSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    resumeVersionId?: boolean
    atsScore?: boolean
    compatibilityText?: boolean
    suggestions?: boolean
    missingKeywords?: boolean
    createdAt?: boolean
    resumeVersion?: boolean | ResumeVersionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["resumeAnalysis"]>

  export type ResumeAnalysisSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    resumeVersionId?: boolean
    atsScore?: boolean
    compatibilityText?: boolean
    suggestions?: boolean
    missingKeywords?: boolean
    createdAt?: boolean
    resumeVersion?: boolean | ResumeVersionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["resumeAnalysis"]>

  export type ResumeAnalysisSelectScalar = {
    id?: boolean
    resumeVersionId?: boolean
    atsScore?: boolean
    compatibilityText?: boolean
    suggestions?: boolean
    missingKeywords?: boolean
    createdAt?: boolean
  }

  export type ResumeAnalysisOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "resumeVersionId" | "atsScore" | "compatibilityText" | "suggestions" | "missingKeywords" | "createdAt", ExtArgs["result"]["resumeAnalysis"]>
  export type ResumeAnalysisInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    resumeVersion?: boolean | ResumeVersionDefaultArgs<ExtArgs>
  }
  export type ResumeAnalysisIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    resumeVersion?: boolean | ResumeVersionDefaultArgs<ExtArgs>
  }
  export type ResumeAnalysisIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    resumeVersion?: boolean | ResumeVersionDefaultArgs<ExtArgs>
  }

  export type $ResumeAnalysisPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ResumeAnalysis"
    objects: {
      resumeVersion: Prisma.$ResumeVersionPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      resumeVersionId: string
      atsScore: number
      compatibilityText: string
      suggestions: Prisma.JsonValue
      missingKeywords: string[]
      createdAt: Date
    }, ExtArgs["result"]["resumeAnalysis"]>
    composites: {}
  }

  type ResumeAnalysisGetPayload<S extends boolean | null | undefined | ResumeAnalysisDefaultArgs> = $Result.GetResult<Prisma.$ResumeAnalysisPayload, S>

  type ResumeAnalysisCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ResumeAnalysisFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ResumeAnalysisCountAggregateInputType | true
    }

  export interface ResumeAnalysisDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ResumeAnalysis'], meta: { name: 'ResumeAnalysis' } }
    /**
     * Find zero or one ResumeAnalysis that matches the filter.
     * @param {ResumeAnalysisFindUniqueArgs} args - Arguments to find a ResumeAnalysis
     * @example
     * // Get one ResumeAnalysis
     * const resumeAnalysis = await prisma.resumeAnalysis.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ResumeAnalysisFindUniqueArgs>(args: SelectSubset<T, ResumeAnalysisFindUniqueArgs<ExtArgs>>): Prisma__ResumeAnalysisClient<$Result.GetResult<Prisma.$ResumeAnalysisPayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one ResumeAnalysis that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ResumeAnalysisFindUniqueOrThrowArgs} args - Arguments to find a ResumeAnalysis
     * @example
     * // Get one ResumeAnalysis
     * const resumeAnalysis = await prisma.resumeAnalysis.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ResumeAnalysisFindUniqueOrThrowArgs>(args: SelectSubset<T, ResumeAnalysisFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ResumeAnalysisClient<$Result.GetResult<Prisma.$ResumeAnalysisPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first ResumeAnalysis that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResumeAnalysisFindFirstArgs} args - Arguments to find a ResumeAnalysis
     * @example
     * // Get one ResumeAnalysis
     * const resumeAnalysis = await prisma.resumeAnalysis.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ResumeAnalysisFindFirstArgs>(args?: SelectSubset<T, ResumeAnalysisFindFirstArgs<ExtArgs>>): Prisma__ResumeAnalysisClient<$Result.GetResult<Prisma.$ResumeAnalysisPayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first ResumeAnalysis that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResumeAnalysisFindFirstOrThrowArgs} args - Arguments to find a ResumeAnalysis
     * @example
     * // Get one ResumeAnalysis
     * const resumeAnalysis = await prisma.resumeAnalysis.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ResumeAnalysisFindFirstOrThrowArgs>(args?: SelectSubset<T, ResumeAnalysisFindFirstOrThrowArgs<ExtArgs>>): Prisma__ResumeAnalysisClient<$Result.GetResult<Prisma.$ResumeAnalysisPayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more ResumeAnalyses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResumeAnalysisFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ResumeAnalyses
     * const resumeAnalyses = await prisma.resumeAnalysis.findMany()
     * 
     * // Get first 10 ResumeAnalyses
     * const resumeAnalyses = await prisma.resumeAnalysis.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const resumeAnalysisWithIdOnly = await prisma.resumeAnalysis.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ResumeAnalysisFindManyArgs>(args?: SelectSubset<T, ResumeAnalysisFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResumeAnalysisPayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a ResumeAnalysis.
     * @param {ResumeAnalysisCreateArgs} args - Arguments to create a ResumeAnalysis.
     * @example
     * // Create one ResumeAnalysis
     * const ResumeAnalysis = await prisma.resumeAnalysis.create({
     *   data: {
     *     // ... data to create a ResumeAnalysis
     *   }
     * })
     * 
     */
    create<T extends ResumeAnalysisCreateArgs>(args: SelectSubset<T, ResumeAnalysisCreateArgs<ExtArgs>>): Prisma__ResumeAnalysisClient<$Result.GetResult<Prisma.$ResumeAnalysisPayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many ResumeAnalyses.
     * @param {ResumeAnalysisCreateManyArgs} args - Arguments to create many ResumeAnalyses.
     * @example
     * // Create many ResumeAnalyses
     * const resumeAnalysis = await prisma.resumeAnalysis.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ResumeAnalysisCreateManyArgs>(args?: SelectSubset<T, ResumeAnalysisCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ResumeAnalyses and returns the data saved in the database.
     * @param {ResumeAnalysisCreateManyAndReturnArgs} args - Arguments to create many ResumeAnalyses.
     * @example
     * // Create many ResumeAnalyses
     * const resumeAnalysis = await prisma.resumeAnalysis.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ResumeAnalyses and only return the `id`
     * const resumeAnalysisWithIdOnly = await prisma.resumeAnalysis.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ResumeAnalysisCreateManyAndReturnArgs>(args?: SelectSubset<T, ResumeAnalysisCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResumeAnalysisPayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a ResumeAnalysis.
     * @param {ResumeAnalysisDeleteArgs} args - Arguments to delete one ResumeAnalysis.
     * @example
     * // Delete one ResumeAnalysis
     * const ResumeAnalysis = await prisma.resumeAnalysis.delete({
     *   where: {
     *     // ... filter to delete one ResumeAnalysis
     *   }
     * })
     * 
     */
    delete<T extends ResumeAnalysisDeleteArgs>(args: SelectSubset<T, ResumeAnalysisDeleteArgs<ExtArgs>>): Prisma__ResumeAnalysisClient<$Result.GetResult<Prisma.$ResumeAnalysisPayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one ResumeAnalysis.
     * @param {ResumeAnalysisUpdateArgs} args - Arguments to update one ResumeAnalysis.
     * @example
     * // Update one ResumeAnalysis
     * const resumeAnalysis = await prisma.resumeAnalysis.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ResumeAnalysisUpdateArgs>(args: SelectSubset<T, ResumeAnalysisUpdateArgs<ExtArgs>>): Prisma__ResumeAnalysisClient<$Result.GetResult<Prisma.$ResumeAnalysisPayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more ResumeAnalyses.
     * @param {ResumeAnalysisDeleteManyArgs} args - Arguments to filter ResumeAnalyses to delete.
     * @example
     * // Delete a few ResumeAnalyses
     * const { count } = await prisma.resumeAnalysis.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ResumeAnalysisDeleteManyArgs>(args?: SelectSubset<T, ResumeAnalysisDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ResumeAnalyses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResumeAnalysisUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ResumeAnalyses
     * const resumeAnalysis = await prisma.resumeAnalysis.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ResumeAnalysisUpdateManyArgs>(args: SelectSubset<T, ResumeAnalysisUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ResumeAnalyses and returns the data updated in the database.
     * @param {ResumeAnalysisUpdateManyAndReturnArgs} args - Arguments to update many ResumeAnalyses.
     * @example
     * // Update many ResumeAnalyses
     * const resumeAnalysis = await prisma.resumeAnalysis.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ResumeAnalyses and only return the `id`
     * const resumeAnalysisWithIdOnly = await prisma.resumeAnalysis.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ResumeAnalysisUpdateManyAndReturnArgs>(args: SelectSubset<T, ResumeAnalysisUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResumeAnalysisPayload<ExtArgs>, T, "updateManyAndReturn", ClientOptions>>

    /**
     * Create or update one ResumeAnalysis.
     * @param {ResumeAnalysisUpsertArgs} args - Arguments to update or create a ResumeAnalysis.
     * @example
     * // Update or create a ResumeAnalysis
     * const resumeAnalysis = await prisma.resumeAnalysis.upsert({
     *   create: {
     *     // ... data to create a ResumeAnalysis
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ResumeAnalysis we want to update
     *   }
     * })
     */
    upsert<T extends ResumeAnalysisUpsertArgs>(args: SelectSubset<T, ResumeAnalysisUpsertArgs<ExtArgs>>): Prisma__ResumeAnalysisClient<$Result.GetResult<Prisma.$ResumeAnalysisPayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of ResumeAnalyses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResumeAnalysisCountArgs} args - Arguments to filter ResumeAnalyses to count.
     * @example
     * // Count the number of ResumeAnalyses
     * const count = await prisma.resumeAnalysis.count({
     *   where: {
     *     // ... the filter for the ResumeAnalyses we want to count
     *   }
     * })
    **/
    count<T extends ResumeAnalysisCountArgs>(
      args?: Subset<T, ResumeAnalysisCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ResumeAnalysisCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ResumeAnalysis.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResumeAnalysisAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ResumeAnalysisAggregateArgs>(args: Subset<T, ResumeAnalysisAggregateArgs>): Prisma.PrismaPromise<GetResumeAnalysisAggregateType<T>>

    /**
     * Group by ResumeAnalysis.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResumeAnalysisGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ResumeAnalysisGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ResumeAnalysisGroupByArgs['orderBy'] }
        : { orderBy?: ResumeAnalysisGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ResumeAnalysisGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetResumeAnalysisGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ResumeAnalysis model
   */
  readonly fields: ResumeAnalysisFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ResumeAnalysis.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ResumeAnalysisClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    resumeVersion<T extends ResumeVersionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ResumeVersionDefaultArgs<ExtArgs>>): Prisma__ResumeVersionClient<$Result.GetResult<Prisma.$ResumeVersionPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | Null, Null, ExtArgs, ClientOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ResumeAnalysis model
   */ 
  interface ResumeAnalysisFieldRefs {
    readonly id: FieldRef<"ResumeAnalysis", 'String'>
    readonly resumeVersionId: FieldRef<"ResumeAnalysis", 'String'>
    readonly atsScore: FieldRef<"ResumeAnalysis", 'Int'>
    readonly compatibilityText: FieldRef<"ResumeAnalysis", 'String'>
    readonly suggestions: FieldRef<"ResumeAnalysis", 'Json'>
    readonly missingKeywords: FieldRef<"ResumeAnalysis", 'String[]'>
    readonly createdAt: FieldRef<"ResumeAnalysis", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ResumeAnalysis findUnique
   */
  export type ResumeAnalysisFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResumeAnalysis
     */
    select?: ResumeAnalysisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResumeAnalysis
     */
    omit?: ResumeAnalysisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeAnalysisInclude<ExtArgs> | null
    /**
     * Filter, which ResumeAnalysis to fetch.
     */
    where: ResumeAnalysisWhereUniqueInput
  }

  /**
   * ResumeAnalysis findUniqueOrThrow
   */
  export type ResumeAnalysisFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResumeAnalysis
     */
    select?: ResumeAnalysisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResumeAnalysis
     */
    omit?: ResumeAnalysisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeAnalysisInclude<ExtArgs> | null
    /**
     * Filter, which ResumeAnalysis to fetch.
     */
    where: ResumeAnalysisWhereUniqueInput
  }

  /**
   * ResumeAnalysis findFirst
   */
  export type ResumeAnalysisFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResumeAnalysis
     */
    select?: ResumeAnalysisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResumeAnalysis
     */
    omit?: ResumeAnalysisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeAnalysisInclude<ExtArgs> | null
    /**
     * Filter, which ResumeAnalysis to fetch.
     */
    where?: ResumeAnalysisWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ResumeAnalyses to fetch.
     */
    orderBy?: ResumeAnalysisOrderByWithRelationInput | ResumeAnalysisOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ResumeAnalyses.
     */
    cursor?: ResumeAnalysisWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ResumeAnalyses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ResumeAnalyses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ResumeAnalyses.
     */
    distinct?: ResumeAnalysisScalarFieldEnum | ResumeAnalysisScalarFieldEnum[]
  }

  /**
   * ResumeAnalysis findFirstOrThrow
   */
  export type ResumeAnalysisFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResumeAnalysis
     */
    select?: ResumeAnalysisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResumeAnalysis
     */
    omit?: ResumeAnalysisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeAnalysisInclude<ExtArgs> | null
    /**
     * Filter, which ResumeAnalysis to fetch.
     */
    where?: ResumeAnalysisWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ResumeAnalyses to fetch.
     */
    orderBy?: ResumeAnalysisOrderByWithRelationInput | ResumeAnalysisOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ResumeAnalyses.
     */
    cursor?: ResumeAnalysisWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ResumeAnalyses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ResumeAnalyses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ResumeAnalyses.
     */
    distinct?: ResumeAnalysisScalarFieldEnum | ResumeAnalysisScalarFieldEnum[]
  }

  /**
   * ResumeAnalysis findMany
   */
  export type ResumeAnalysisFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResumeAnalysis
     */
    select?: ResumeAnalysisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResumeAnalysis
     */
    omit?: ResumeAnalysisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeAnalysisInclude<ExtArgs> | null
    /**
     * Filter, which ResumeAnalyses to fetch.
     */
    where?: ResumeAnalysisWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ResumeAnalyses to fetch.
     */
    orderBy?: ResumeAnalysisOrderByWithRelationInput | ResumeAnalysisOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ResumeAnalyses.
     */
    cursor?: ResumeAnalysisWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ResumeAnalyses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ResumeAnalyses.
     */
    skip?: number
    distinct?: ResumeAnalysisScalarFieldEnum | ResumeAnalysisScalarFieldEnum[]
  }

  /**
   * ResumeAnalysis create
   */
  export type ResumeAnalysisCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResumeAnalysis
     */
    select?: ResumeAnalysisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResumeAnalysis
     */
    omit?: ResumeAnalysisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeAnalysisInclude<ExtArgs> | null
    /**
     * The data needed to create a ResumeAnalysis.
     */
    data: XOR<ResumeAnalysisCreateInput, ResumeAnalysisUncheckedCreateInput>
  }

  /**
   * ResumeAnalysis createMany
   */
  export type ResumeAnalysisCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ResumeAnalyses.
     */
    data: ResumeAnalysisCreateManyInput | ResumeAnalysisCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ResumeAnalysis createManyAndReturn
   */
  export type ResumeAnalysisCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResumeAnalysis
     */
    select?: ResumeAnalysisSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ResumeAnalysis
     */
    omit?: ResumeAnalysisOmit<ExtArgs> | null
    /**
     * The data used to create many ResumeAnalyses.
     */
    data: ResumeAnalysisCreateManyInput | ResumeAnalysisCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeAnalysisIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ResumeAnalysis update
   */
  export type ResumeAnalysisUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResumeAnalysis
     */
    select?: ResumeAnalysisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResumeAnalysis
     */
    omit?: ResumeAnalysisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeAnalysisInclude<ExtArgs> | null
    /**
     * The data needed to update a ResumeAnalysis.
     */
    data: XOR<ResumeAnalysisUpdateInput, ResumeAnalysisUncheckedUpdateInput>
    /**
     * Choose, which ResumeAnalysis to update.
     */
    where: ResumeAnalysisWhereUniqueInput
  }

  /**
   * ResumeAnalysis updateMany
   */
  export type ResumeAnalysisUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ResumeAnalyses.
     */
    data: XOR<ResumeAnalysisUpdateManyMutationInput, ResumeAnalysisUncheckedUpdateManyInput>
    /**
     * Filter which ResumeAnalyses to update
     */
    where?: ResumeAnalysisWhereInput
    /**
     * Limit how many ResumeAnalyses to update.
     */
    limit?: number
  }

  /**
   * ResumeAnalysis updateManyAndReturn
   */
  export type ResumeAnalysisUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResumeAnalysis
     */
    select?: ResumeAnalysisSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ResumeAnalysis
     */
    omit?: ResumeAnalysisOmit<ExtArgs> | null
    /**
     * The data used to update ResumeAnalyses.
     */
    data: XOR<ResumeAnalysisUpdateManyMutationInput, ResumeAnalysisUncheckedUpdateManyInput>
    /**
     * Filter which ResumeAnalyses to update
     */
    where?: ResumeAnalysisWhereInput
    /**
     * Limit how many ResumeAnalyses to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeAnalysisIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ResumeAnalysis upsert
   */
  export type ResumeAnalysisUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResumeAnalysis
     */
    select?: ResumeAnalysisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResumeAnalysis
     */
    omit?: ResumeAnalysisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeAnalysisInclude<ExtArgs> | null
    /**
     * The filter to search for the ResumeAnalysis to update in case it exists.
     */
    where: ResumeAnalysisWhereUniqueInput
    /**
     * In case the ResumeAnalysis found by the `where` argument doesn't exist, create a new ResumeAnalysis with this data.
     */
    create: XOR<ResumeAnalysisCreateInput, ResumeAnalysisUncheckedCreateInput>
    /**
     * In case the ResumeAnalysis was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ResumeAnalysisUpdateInput, ResumeAnalysisUncheckedUpdateInput>
  }

  /**
   * ResumeAnalysis delete
   */
  export type ResumeAnalysisDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResumeAnalysis
     */
    select?: ResumeAnalysisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResumeAnalysis
     */
    omit?: ResumeAnalysisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeAnalysisInclude<ExtArgs> | null
    /**
     * Filter which ResumeAnalysis to delete.
     */
    where: ResumeAnalysisWhereUniqueInput
  }

  /**
   * ResumeAnalysis deleteMany
   */
  export type ResumeAnalysisDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ResumeAnalyses to delete
     */
    where?: ResumeAnalysisWhereInput
    /**
     * Limit how many ResumeAnalyses to delete.
     */
    limit?: number
  }

  /**
   * ResumeAnalysis without action
   */
  export type ResumeAnalysisDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResumeAnalysis
     */
    select?: ResumeAnalysisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResumeAnalysis
     */
    omit?: ResumeAnalysisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeAnalysisInclude<ExtArgs> | null
  }


  /**
   * Model Application
   */

  export type AggregateApplication = {
    _count: ApplicationCountAggregateOutputType | null
    _min: ApplicationMinAggregateOutputType | null
    _max: ApplicationMaxAggregateOutputType | null
  }

  export type ApplicationMinAggregateOutputType = {
    id: string | null
    userId: string | null
    title: string | null
    company: string | null
    status: string | null
    priorityFlag: boolean | null
    location: string | null
    appliedDate: Date | null
    createdAt: Date | null
  }

  export type ApplicationMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    title: string | null
    company: string | null
    status: string | null
    priorityFlag: boolean | null
    location: string | null
    appliedDate: Date | null
    createdAt: Date | null
  }

  export type ApplicationCountAggregateOutputType = {
    id: number
    userId: number
    title: number
    company: number
    status: number
    priorityFlag: number
    location: number
    appliedDate: number
    createdAt: number
    _all: number
  }


  export type ApplicationMinAggregateInputType = {
    id?: true
    userId?: true
    title?: true
    company?: true
    status?: true
    priorityFlag?: true
    location?: true
    appliedDate?: true
    createdAt?: true
  }

  export type ApplicationMaxAggregateInputType = {
    id?: true
    userId?: true
    title?: true
    company?: true
    status?: true
    priorityFlag?: true
    location?: true
    appliedDate?: true
    createdAt?: true
  }

  export type ApplicationCountAggregateInputType = {
    id?: true
    userId?: true
    title?: true
    company?: true
    status?: true
    priorityFlag?: true
    location?: true
    appliedDate?: true
    createdAt?: true
    _all?: true
  }

  export type ApplicationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Application to aggregate.
     */
    where?: ApplicationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Applications to fetch.
     */
    orderBy?: ApplicationOrderByWithRelationInput | ApplicationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ApplicationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Applications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Applications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Applications
    **/
    _count?: true | ApplicationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ApplicationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ApplicationMaxAggregateInputType
  }

  export type GetApplicationAggregateType<T extends ApplicationAggregateArgs> = {
        [P in keyof T & keyof AggregateApplication]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateApplication[P]>
      : GetScalarType<T[P], AggregateApplication[P]>
  }




  export type ApplicationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ApplicationWhereInput
    orderBy?: ApplicationOrderByWithAggregationInput | ApplicationOrderByWithAggregationInput[]
    by: ApplicationScalarFieldEnum[] | ApplicationScalarFieldEnum
    having?: ApplicationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ApplicationCountAggregateInputType | true
    _min?: ApplicationMinAggregateInputType
    _max?: ApplicationMaxAggregateInputType
  }

  export type ApplicationGroupByOutputType = {
    id: string
    userId: string
    title: string
    company: string
    status: string
    priorityFlag: boolean
    location: string | null
    appliedDate: Date | null
    createdAt: Date
    _count: ApplicationCountAggregateOutputType | null
    _min: ApplicationMinAggregateOutputType | null
    _max: ApplicationMaxAggregateOutputType | null
  }

  type GetApplicationGroupByPayload<T extends ApplicationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ApplicationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ApplicationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ApplicationGroupByOutputType[P]>
            : GetScalarType<T[P], ApplicationGroupByOutputType[P]>
        }
      >
    >


  export type ApplicationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    title?: boolean
    company?: boolean
    status?: boolean
    priorityFlag?: boolean
    location?: boolean
    appliedDate?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["application"]>

  export type ApplicationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    title?: boolean
    company?: boolean
    status?: boolean
    priorityFlag?: boolean
    location?: boolean
    appliedDate?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["application"]>

  export type ApplicationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    title?: boolean
    company?: boolean
    status?: boolean
    priorityFlag?: boolean
    location?: boolean
    appliedDate?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["application"]>

  export type ApplicationSelectScalar = {
    id?: boolean
    userId?: boolean
    title?: boolean
    company?: boolean
    status?: boolean
    priorityFlag?: boolean
    location?: boolean
    appliedDate?: boolean
    createdAt?: boolean
  }

  export type ApplicationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "title" | "company" | "status" | "priorityFlag" | "location" | "appliedDate" | "createdAt", ExtArgs["result"]["application"]>
  export type ApplicationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ApplicationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ApplicationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ApplicationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Application"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      title: string
      company: string
      status: string
      priorityFlag: boolean
      location: string | null
      appliedDate: Date | null
      createdAt: Date
    }, ExtArgs["result"]["application"]>
    composites: {}
  }

  type ApplicationGetPayload<S extends boolean | null | undefined | ApplicationDefaultArgs> = $Result.GetResult<Prisma.$ApplicationPayload, S>

  type ApplicationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ApplicationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ApplicationCountAggregateInputType | true
    }

  export interface ApplicationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Application'], meta: { name: 'Application' } }
    /**
     * Find zero or one Application that matches the filter.
     * @param {ApplicationFindUniqueArgs} args - Arguments to find a Application
     * @example
     * // Get one Application
     * const application = await prisma.application.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ApplicationFindUniqueArgs>(args: SelectSubset<T, ApplicationFindUniqueArgs<ExtArgs>>): Prisma__ApplicationClient<$Result.GetResult<Prisma.$ApplicationPayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one Application that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ApplicationFindUniqueOrThrowArgs} args - Arguments to find a Application
     * @example
     * // Get one Application
     * const application = await prisma.application.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ApplicationFindUniqueOrThrowArgs>(args: SelectSubset<T, ApplicationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ApplicationClient<$Result.GetResult<Prisma.$ApplicationPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first Application that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApplicationFindFirstArgs} args - Arguments to find a Application
     * @example
     * // Get one Application
     * const application = await prisma.application.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ApplicationFindFirstArgs>(args?: SelectSubset<T, ApplicationFindFirstArgs<ExtArgs>>): Prisma__ApplicationClient<$Result.GetResult<Prisma.$ApplicationPayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first Application that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApplicationFindFirstOrThrowArgs} args - Arguments to find a Application
     * @example
     * // Get one Application
     * const application = await prisma.application.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ApplicationFindFirstOrThrowArgs>(args?: SelectSubset<T, ApplicationFindFirstOrThrowArgs<ExtArgs>>): Prisma__ApplicationClient<$Result.GetResult<Prisma.$ApplicationPayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more Applications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApplicationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Applications
     * const applications = await prisma.application.findMany()
     * 
     * // Get first 10 Applications
     * const applications = await prisma.application.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const applicationWithIdOnly = await prisma.application.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ApplicationFindManyArgs>(args?: SelectSubset<T, ApplicationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ApplicationPayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a Application.
     * @param {ApplicationCreateArgs} args - Arguments to create a Application.
     * @example
     * // Create one Application
     * const Application = await prisma.application.create({
     *   data: {
     *     // ... data to create a Application
     *   }
     * })
     * 
     */
    create<T extends ApplicationCreateArgs>(args: SelectSubset<T, ApplicationCreateArgs<ExtArgs>>): Prisma__ApplicationClient<$Result.GetResult<Prisma.$ApplicationPayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many Applications.
     * @param {ApplicationCreateManyArgs} args - Arguments to create many Applications.
     * @example
     * // Create many Applications
     * const application = await prisma.application.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ApplicationCreateManyArgs>(args?: SelectSubset<T, ApplicationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Applications and returns the data saved in the database.
     * @param {ApplicationCreateManyAndReturnArgs} args - Arguments to create many Applications.
     * @example
     * // Create many Applications
     * const application = await prisma.application.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Applications and only return the `id`
     * const applicationWithIdOnly = await prisma.application.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ApplicationCreateManyAndReturnArgs>(args?: SelectSubset<T, ApplicationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ApplicationPayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a Application.
     * @param {ApplicationDeleteArgs} args - Arguments to delete one Application.
     * @example
     * // Delete one Application
     * const Application = await prisma.application.delete({
     *   where: {
     *     // ... filter to delete one Application
     *   }
     * })
     * 
     */
    delete<T extends ApplicationDeleteArgs>(args: SelectSubset<T, ApplicationDeleteArgs<ExtArgs>>): Prisma__ApplicationClient<$Result.GetResult<Prisma.$ApplicationPayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one Application.
     * @param {ApplicationUpdateArgs} args - Arguments to update one Application.
     * @example
     * // Update one Application
     * const application = await prisma.application.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ApplicationUpdateArgs>(args: SelectSubset<T, ApplicationUpdateArgs<ExtArgs>>): Prisma__ApplicationClient<$Result.GetResult<Prisma.$ApplicationPayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more Applications.
     * @param {ApplicationDeleteManyArgs} args - Arguments to filter Applications to delete.
     * @example
     * // Delete a few Applications
     * const { count } = await prisma.application.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ApplicationDeleteManyArgs>(args?: SelectSubset<T, ApplicationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Applications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApplicationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Applications
     * const application = await prisma.application.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ApplicationUpdateManyArgs>(args: SelectSubset<T, ApplicationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Applications and returns the data updated in the database.
     * @param {ApplicationUpdateManyAndReturnArgs} args - Arguments to update many Applications.
     * @example
     * // Update many Applications
     * const application = await prisma.application.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Applications and only return the `id`
     * const applicationWithIdOnly = await prisma.application.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ApplicationUpdateManyAndReturnArgs>(args: SelectSubset<T, ApplicationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ApplicationPayload<ExtArgs>, T, "updateManyAndReturn", ClientOptions>>

    /**
     * Create or update one Application.
     * @param {ApplicationUpsertArgs} args - Arguments to update or create a Application.
     * @example
     * // Update or create a Application
     * const application = await prisma.application.upsert({
     *   create: {
     *     // ... data to create a Application
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Application we want to update
     *   }
     * })
     */
    upsert<T extends ApplicationUpsertArgs>(args: SelectSubset<T, ApplicationUpsertArgs<ExtArgs>>): Prisma__ApplicationClient<$Result.GetResult<Prisma.$ApplicationPayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of Applications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApplicationCountArgs} args - Arguments to filter Applications to count.
     * @example
     * // Count the number of Applications
     * const count = await prisma.application.count({
     *   where: {
     *     // ... the filter for the Applications we want to count
     *   }
     * })
    **/
    count<T extends ApplicationCountArgs>(
      args?: Subset<T, ApplicationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ApplicationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Application.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApplicationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ApplicationAggregateArgs>(args: Subset<T, ApplicationAggregateArgs>): Prisma.PrismaPromise<GetApplicationAggregateType<T>>

    /**
     * Group by Application.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApplicationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ApplicationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ApplicationGroupByArgs['orderBy'] }
        : { orderBy?: ApplicationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ApplicationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetApplicationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Application model
   */
  readonly fields: ApplicationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Application.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ApplicationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | Null, Null, ExtArgs, ClientOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Application model
   */ 
  interface ApplicationFieldRefs {
    readonly id: FieldRef<"Application", 'String'>
    readonly userId: FieldRef<"Application", 'String'>
    readonly title: FieldRef<"Application", 'String'>
    readonly company: FieldRef<"Application", 'String'>
    readonly status: FieldRef<"Application", 'String'>
    readonly priorityFlag: FieldRef<"Application", 'Boolean'>
    readonly location: FieldRef<"Application", 'String'>
    readonly appliedDate: FieldRef<"Application", 'DateTime'>
    readonly createdAt: FieldRef<"Application", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Application findUnique
   */
  export type ApplicationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Application
     */
    select?: ApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Application
     */
    omit?: ApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicationInclude<ExtArgs> | null
    /**
     * Filter, which Application to fetch.
     */
    where: ApplicationWhereUniqueInput
  }

  /**
   * Application findUniqueOrThrow
   */
  export type ApplicationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Application
     */
    select?: ApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Application
     */
    omit?: ApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicationInclude<ExtArgs> | null
    /**
     * Filter, which Application to fetch.
     */
    where: ApplicationWhereUniqueInput
  }

  /**
   * Application findFirst
   */
  export type ApplicationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Application
     */
    select?: ApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Application
     */
    omit?: ApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicationInclude<ExtArgs> | null
    /**
     * Filter, which Application to fetch.
     */
    where?: ApplicationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Applications to fetch.
     */
    orderBy?: ApplicationOrderByWithRelationInput | ApplicationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Applications.
     */
    cursor?: ApplicationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Applications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Applications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Applications.
     */
    distinct?: ApplicationScalarFieldEnum | ApplicationScalarFieldEnum[]
  }

  /**
   * Application findFirstOrThrow
   */
  export type ApplicationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Application
     */
    select?: ApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Application
     */
    omit?: ApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicationInclude<ExtArgs> | null
    /**
     * Filter, which Application to fetch.
     */
    where?: ApplicationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Applications to fetch.
     */
    orderBy?: ApplicationOrderByWithRelationInput | ApplicationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Applications.
     */
    cursor?: ApplicationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Applications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Applications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Applications.
     */
    distinct?: ApplicationScalarFieldEnum | ApplicationScalarFieldEnum[]
  }

  /**
   * Application findMany
   */
  export type ApplicationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Application
     */
    select?: ApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Application
     */
    omit?: ApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicationInclude<ExtArgs> | null
    /**
     * Filter, which Applications to fetch.
     */
    where?: ApplicationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Applications to fetch.
     */
    orderBy?: ApplicationOrderByWithRelationInput | ApplicationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Applications.
     */
    cursor?: ApplicationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Applications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Applications.
     */
    skip?: number
    distinct?: ApplicationScalarFieldEnum | ApplicationScalarFieldEnum[]
  }

  /**
   * Application create
   */
  export type ApplicationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Application
     */
    select?: ApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Application
     */
    omit?: ApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicationInclude<ExtArgs> | null
    /**
     * The data needed to create a Application.
     */
    data: XOR<ApplicationCreateInput, ApplicationUncheckedCreateInput>
  }

  /**
   * Application createMany
   */
  export type ApplicationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Applications.
     */
    data: ApplicationCreateManyInput | ApplicationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Application createManyAndReturn
   */
  export type ApplicationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Application
     */
    select?: ApplicationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Application
     */
    omit?: ApplicationOmit<ExtArgs> | null
    /**
     * The data used to create many Applications.
     */
    data: ApplicationCreateManyInput | ApplicationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Application update
   */
  export type ApplicationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Application
     */
    select?: ApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Application
     */
    omit?: ApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicationInclude<ExtArgs> | null
    /**
     * The data needed to update a Application.
     */
    data: XOR<ApplicationUpdateInput, ApplicationUncheckedUpdateInput>
    /**
     * Choose, which Application to update.
     */
    where: ApplicationWhereUniqueInput
  }

  /**
   * Application updateMany
   */
  export type ApplicationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Applications.
     */
    data: XOR<ApplicationUpdateManyMutationInput, ApplicationUncheckedUpdateManyInput>
    /**
     * Filter which Applications to update
     */
    where?: ApplicationWhereInput
    /**
     * Limit how many Applications to update.
     */
    limit?: number
  }

  /**
   * Application updateManyAndReturn
   */
  export type ApplicationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Application
     */
    select?: ApplicationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Application
     */
    omit?: ApplicationOmit<ExtArgs> | null
    /**
     * The data used to update Applications.
     */
    data: XOR<ApplicationUpdateManyMutationInput, ApplicationUncheckedUpdateManyInput>
    /**
     * Filter which Applications to update
     */
    where?: ApplicationWhereInput
    /**
     * Limit how many Applications to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Application upsert
   */
  export type ApplicationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Application
     */
    select?: ApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Application
     */
    omit?: ApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicationInclude<ExtArgs> | null
    /**
     * The filter to search for the Application to update in case it exists.
     */
    where: ApplicationWhereUniqueInput
    /**
     * In case the Application found by the `where` argument doesn't exist, create a new Application with this data.
     */
    create: XOR<ApplicationCreateInput, ApplicationUncheckedCreateInput>
    /**
     * In case the Application was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ApplicationUpdateInput, ApplicationUncheckedUpdateInput>
  }

  /**
   * Application delete
   */
  export type ApplicationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Application
     */
    select?: ApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Application
     */
    omit?: ApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicationInclude<ExtArgs> | null
    /**
     * Filter which Application to delete.
     */
    where: ApplicationWhereUniqueInput
  }

  /**
   * Application deleteMany
   */
  export type ApplicationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Applications to delete
     */
    where?: ApplicationWhereInput
    /**
     * Limit how many Applications to delete.
     */
    limit?: number
  }

  /**
   * Application without action
   */
  export type ApplicationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Application
     */
    select?: ApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Application
     */
    omit?: ApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicationInclude<ExtArgs> | null
  }


  /**
   * Model CareerRoadmap
   */

  export type AggregateCareerRoadmap = {
    _count: CareerRoadmapCountAggregateOutputType | null
    _avg: CareerRoadmapAvgAggregateOutputType | null
    _sum: CareerRoadmapSumAggregateOutputType | null
    _min: CareerRoadmapMinAggregateOutputType | null
    _max: CareerRoadmapMaxAggregateOutputType | null
  }

  export type CareerRoadmapAvgAggregateOutputType = {
    duration: number | null
  }

  export type CareerRoadmapSumAggregateOutputType = {
    duration: number | null
  }

  export type CareerRoadmapMinAggregateOutputType = {
    id: string | null
    userId: string | null
    title: string | null
    duration: number | null
    skillLevel: string | null
    createdAt: Date | null
  }

  export type CareerRoadmapMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    title: string | null
    duration: number | null
    skillLevel: string | null
    createdAt: Date | null
  }

  export type CareerRoadmapCountAggregateOutputType = {
    id: number
    userId: number
    title: number
    duration: number
    skillLevel: number
    createdAt: number
    checkedTasks: number
    _all: number
  }


  export type CareerRoadmapAvgAggregateInputType = {
    duration?: true
  }

  export type CareerRoadmapSumAggregateInputType = {
    duration?: true
  }

  export type CareerRoadmapMinAggregateInputType = {
    id?: true
    userId?: true
    title?: true
    duration?: true
    skillLevel?: true
    createdAt?: true
  }

  export type CareerRoadmapMaxAggregateInputType = {
    id?: true
    userId?: true
    title?: true
    duration?: true
    skillLevel?: true
    createdAt?: true
  }

  export type CareerRoadmapCountAggregateInputType = {
    id?: true
    userId?: true
    title?: true
    duration?: true
    skillLevel?: true
    createdAt?: true
    checkedTasks?: true
    _all?: true
  }

  export type CareerRoadmapAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CareerRoadmap to aggregate.
     */
    where?: CareerRoadmapWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CareerRoadmaps to fetch.
     */
    orderBy?: CareerRoadmapOrderByWithRelationInput | CareerRoadmapOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CareerRoadmapWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CareerRoadmaps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CareerRoadmaps.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CareerRoadmaps
    **/
    _count?: true | CareerRoadmapCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CareerRoadmapAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CareerRoadmapSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CareerRoadmapMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CareerRoadmapMaxAggregateInputType
  }

  export type GetCareerRoadmapAggregateType<T extends CareerRoadmapAggregateArgs> = {
        [P in keyof T & keyof AggregateCareerRoadmap]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCareerRoadmap[P]>
      : GetScalarType<T[P], AggregateCareerRoadmap[P]>
  }




  export type CareerRoadmapGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CareerRoadmapWhereInput
    orderBy?: CareerRoadmapOrderByWithAggregationInput | CareerRoadmapOrderByWithAggregationInput[]
    by: CareerRoadmapScalarFieldEnum[] | CareerRoadmapScalarFieldEnum
    having?: CareerRoadmapScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CareerRoadmapCountAggregateInputType | true
    _avg?: CareerRoadmapAvgAggregateInputType
    _sum?: CareerRoadmapSumAggregateInputType
    _min?: CareerRoadmapMinAggregateInputType
    _max?: CareerRoadmapMaxAggregateInputType
  }

  export type CareerRoadmapGroupByOutputType = {
    id: string
    userId: string
    title: string
    duration: number
    skillLevel: string
    createdAt: Date
    checkedTasks: JsonValue
    _count: CareerRoadmapCountAggregateOutputType | null
    _avg: CareerRoadmapAvgAggregateOutputType | null
    _sum: CareerRoadmapSumAggregateOutputType | null
    _min: CareerRoadmapMinAggregateOutputType | null
    _max: CareerRoadmapMaxAggregateOutputType | null
  }

  type GetCareerRoadmapGroupByPayload<T extends CareerRoadmapGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CareerRoadmapGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CareerRoadmapGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CareerRoadmapGroupByOutputType[P]>
            : GetScalarType<T[P], CareerRoadmapGroupByOutputType[P]>
        }
      >
    >


  export type CareerRoadmapSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    title?: boolean
    duration?: boolean
    skillLevel?: boolean
    createdAt?: boolean
    checkedTasks?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    milestones?: boolean | CareerRoadmap$milestonesArgs<ExtArgs>
    _count?: boolean | CareerRoadmapCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["careerRoadmap"]>

  export type CareerRoadmapSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    title?: boolean
    duration?: boolean
    skillLevel?: boolean
    createdAt?: boolean
    checkedTasks?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["careerRoadmap"]>

  export type CareerRoadmapSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    title?: boolean
    duration?: boolean
    skillLevel?: boolean
    createdAt?: boolean
    checkedTasks?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["careerRoadmap"]>

  export type CareerRoadmapSelectScalar = {
    id?: boolean
    userId?: boolean
    title?: boolean
    duration?: boolean
    skillLevel?: boolean
    createdAt?: boolean
    checkedTasks?: boolean
  }

  export type CareerRoadmapOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "title" | "duration" | "skillLevel" | "createdAt" | "checkedTasks", ExtArgs["result"]["careerRoadmap"]>
  export type CareerRoadmapInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    milestones?: boolean | CareerRoadmap$milestonesArgs<ExtArgs>
    _count?: boolean | CareerRoadmapCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CareerRoadmapIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type CareerRoadmapIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $CareerRoadmapPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CareerRoadmap"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      milestones: Prisma.$RoadmapMilestonePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      title: string
      duration: number
      skillLevel: string
      createdAt: Date
      checkedTasks: Prisma.JsonValue
    }, ExtArgs["result"]["careerRoadmap"]>
    composites: {}
  }

  type CareerRoadmapGetPayload<S extends boolean | null | undefined | CareerRoadmapDefaultArgs> = $Result.GetResult<Prisma.$CareerRoadmapPayload, S>

  type CareerRoadmapCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CareerRoadmapFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CareerRoadmapCountAggregateInputType | true
    }

  export interface CareerRoadmapDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CareerRoadmap'], meta: { name: 'CareerRoadmap' } }
    /**
     * Find zero or one CareerRoadmap that matches the filter.
     * @param {CareerRoadmapFindUniqueArgs} args - Arguments to find a CareerRoadmap
     * @example
     * // Get one CareerRoadmap
     * const careerRoadmap = await prisma.careerRoadmap.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CareerRoadmapFindUniqueArgs>(args: SelectSubset<T, CareerRoadmapFindUniqueArgs<ExtArgs>>): Prisma__CareerRoadmapClient<$Result.GetResult<Prisma.$CareerRoadmapPayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one CareerRoadmap that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CareerRoadmapFindUniqueOrThrowArgs} args - Arguments to find a CareerRoadmap
     * @example
     * // Get one CareerRoadmap
     * const careerRoadmap = await prisma.careerRoadmap.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CareerRoadmapFindUniqueOrThrowArgs>(args: SelectSubset<T, CareerRoadmapFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CareerRoadmapClient<$Result.GetResult<Prisma.$CareerRoadmapPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first CareerRoadmap that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CareerRoadmapFindFirstArgs} args - Arguments to find a CareerRoadmap
     * @example
     * // Get one CareerRoadmap
     * const careerRoadmap = await prisma.careerRoadmap.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CareerRoadmapFindFirstArgs>(args?: SelectSubset<T, CareerRoadmapFindFirstArgs<ExtArgs>>): Prisma__CareerRoadmapClient<$Result.GetResult<Prisma.$CareerRoadmapPayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first CareerRoadmap that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CareerRoadmapFindFirstOrThrowArgs} args - Arguments to find a CareerRoadmap
     * @example
     * // Get one CareerRoadmap
     * const careerRoadmap = await prisma.careerRoadmap.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CareerRoadmapFindFirstOrThrowArgs>(args?: SelectSubset<T, CareerRoadmapFindFirstOrThrowArgs<ExtArgs>>): Prisma__CareerRoadmapClient<$Result.GetResult<Prisma.$CareerRoadmapPayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more CareerRoadmaps that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CareerRoadmapFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CareerRoadmaps
     * const careerRoadmaps = await prisma.careerRoadmap.findMany()
     * 
     * // Get first 10 CareerRoadmaps
     * const careerRoadmaps = await prisma.careerRoadmap.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const careerRoadmapWithIdOnly = await prisma.careerRoadmap.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CareerRoadmapFindManyArgs>(args?: SelectSubset<T, CareerRoadmapFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CareerRoadmapPayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a CareerRoadmap.
     * @param {CareerRoadmapCreateArgs} args - Arguments to create a CareerRoadmap.
     * @example
     * // Create one CareerRoadmap
     * const CareerRoadmap = await prisma.careerRoadmap.create({
     *   data: {
     *     // ... data to create a CareerRoadmap
     *   }
     * })
     * 
     */
    create<T extends CareerRoadmapCreateArgs>(args: SelectSubset<T, CareerRoadmapCreateArgs<ExtArgs>>): Prisma__CareerRoadmapClient<$Result.GetResult<Prisma.$CareerRoadmapPayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many CareerRoadmaps.
     * @param {CareerRoadmapCreateManyArgs} args - Arguments to create many CareerRoadmaps.
     * @example
     * // Create many CareerRoadmaps
     * const careerRoadmap = await prisma.careerRoadmap.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CareerRoadmapCreateManyArgs>(args?: SelectSubset<T, CareerRoadmapCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CareerRoadmaps and returns the data saved in the database.
     * @param {CareerRoadmapCreateManyAndReturnArgs} args - Arguments to create many CareerRoadmaps.
     * @example
     * // Create many CareerRoadmaps
     * const careerRoadmap = await prisma.careerRoadmap.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CareerRoadmaps and only return the `id`
     * const careerRoadmapWithIdOnly = await prisma.careerRoadmap.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CareerRoadmapCreateManyAndReturnArgs>(args?: SelectSubset<T, CareerRoadmapCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CareerRoadmapPayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a CareerRoadmap.
     * @param {CareerRoadmapDeleteArgs} args - Arguments to delete one CareerRoadmap.
     * @example
     * // Delete one CareerRoadmap
     * const CareerRoadmap = await prisma.careerRoadmap.delete({
     *   where: {
     *     // ... filter to delete one CareerRoadmap
     *   }
     * })
     * 
     */
    delete<T extends CareerRoadmapDeleteArgs>(args: SelectSubset<T, CareerRoadmapDeleteArgs<ExtArgs>>): Prisma__CareerRoadmapClient<$Result.GetResult<Prisma.$CareerRoadmapPayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one CareerRoadmap.
     * @param {CareerRoadmapUpdateArgs} args - Arguments to update one CareerRoadmap.
     * @example
     * // Update one CareerRoadmap
     * const careerRoadmap = await prisma.careerRoadmap.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CareerRoadmapUpdateArgs>(args: SelectSubset<T, CareerRoadmapUpdateArgs<ExtArgs>>): Prisma__CareerRoadmapClient<$Result.GetResult<Prisma.$CareerRoadmapPayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more CareerRoadmaps.
     * @param {CareerRoadmapDeleteManyArgs} args - Arguments to filter CareerRoadmaps to delete.
     * @example
     * // Delete a few CareerRoadmaps
     * const { count } = await prisma.careerRoadmap.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CareerRoadmapDeleteManyArgs>(args?: SelectSubset<T, CareerRoadmapDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CareerRoadmaps.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CareerRoadmapUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CareerRoadmaps
     * const careerRoadmap = await prisma.careerRoadmap.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CareerRoadmapUpdateManyArgs>(args: SelectSubset<T, CareerRoadmapUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CareerRoadmaps and returns the data updated in the database.
     * @param {CareerRoadmapUpdateManyAndReturnArgs} args - Arguments to update many CareerRoadmaps.
     * @example
     * // Update many CareerRoadmaps
     * const careerRoadmap = await prisma.careerRoadmap.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CareerRoadmaps and only return the `id`
     * const careerRoadmapWithIdOnly = await prisma.careerRoadmap.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CareerRoadmapUpdateManyAndReturnArgs>(args: SelectSubset<T, CareerRoadmapUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CareerRoadmapPayload<ExtArgs>, T, "updateManyAndReturn", ClientOptions>>

    /**
     * Create or update one CareerRoadmap.
     * @param {CareerRoadmapUpsertArgs} args - Arguments to update or create a CareerRoadmap.
     * @example
     * // Update or create a CareerRoadmap
     * const careerRoadmap = await prisma.careerRoadmap.upsert({
     *   create: {
     *     // ... data to create a CareerRoadmap
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CareerRoadmap we want to update
     *   }
     * })
     */
    upsert<T extends CareerRoadmapUpsertArgs>(args: SelectSubset<T, CareerRoadmapUpsertArgs<ExtArgs>>): Prisma__CareerRoadmapClient<$Result.GetResult<Prisma.$CareerRoadmapPayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of CareerRoadmaps.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CareerRoadmapCountArgs} args - Arguments to filter CareerRoadmaps to count.
     * @example
     * // Count the number of CareerRoadmaps
     * const count = await prisma.careerRoadmap.count({
     *   where: {
     *     // ... the filter for the CareerRoadmaps we want to count
     *   }
     * })
    **/
    count<T extends CareerRoadmapCountArgs>(
      args?: Subset<T, CareerRoadmapCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CareerRoadmapCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CareerRoadmap.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CareerRoadmapAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CareerRoadmapAggregateArgs>(args: Subset<T, CareerRoadmapAggregateArgs>): Prisma.PrismaPromise<GetCareerRoadmapAggregateType<T>>

    /**
     * Group by CareerRoadmap.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CareerRoadmapGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CareerRoadmapGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CareerRoadmapGroupByArgs['orderBy'] }
        : { orderBy?: CareerRoadmapGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CareerRoadmapGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCareerRoadmapGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CareerRoadmap model
   */
  readonly fields: CareerRoadmapFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CareerRoadmap.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CareerRoadmapClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | Null, Null, ExtArgs, ClientOptions>
    milestones<T extends CareerRoadmap$milestonesArgs<ExtArgs> = {}>(args?: Subset<T, CareerRoadmap$milestonesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoadmapMilestonePayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CareerRoadmap model
   */ 
  interface CareerRoadmapFieldRefs {
    readonly id: FieldRef<"CareerRoadmap", 'String'>
    readonly userId: FieldRef<"CareerRoadmap", 'String'>
    readonly title: FieldRef<"CareerRoadmap", 'String'>
    readonly duration: FieldRef<"CareerRoadmap", 'Int'>
    readonly skillLevel: FieldRef<"CareerRoadmap", 'String'>
    readonly createdAt: FieldRef<"CareerRoadmap", 'DateTime'>
    readonly checkedTasks: FieldRef<"CareerRoadmap", 'Json'>
  }
    

  // Custom InputTypes
  /**
   * CareerRoadmap findUnique
   */
  export type CareerRoadmapFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CareerRoadmap
     */
    select?: CareerRoadmapSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CareerRoadmap
     */
    omit?: CareerRoadmapOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CareerRoadmapInclude<ExtArgs> | null
    /**
     * Filter, which CareerRoadmap to fetch.
     */
    where: CareerRoadmapWhereUniqueInput
  }

  /**
   * CareerRoadmap findUniqueOrThrow
   */
  export type CareerRoadmapFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CareerRoadmap
     */
    select?: CareerRoadmapSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CareerRoadmap
     */
    omit?: CareerRoadmapOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CareerRoadmapInclude<ExtArgs> | null
    /**
     * Filter, which CareerRoadmap to fetch.
     */
    where: CareerRoadmapWhereUniqueInput
  }

  /**
   * CareerRoadmap findFirst
   */
  export type CareerRoadmapFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CareerRoadmap
     */
    select?: CareerRoadmapSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CareerRoadmap
     */
    omit?: CareerRoadmapOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CareerRoadmapInclude<ExtArgs> | null
    /**
     * Filter, which CareerRoadmap to fetch.
     */
    where?: CareerRoadmapWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CareerRoadmaps to fetch.
     */
    orderBy?: CareerRoadmapOrderByWithRelationInput | CareerRoadmapOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CareerRoadmaps.
     */
    cursor?: CareerRoadmapWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CareerRoadmaps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CareerRoadmaps.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CareerRoadmaps.
     */
    distinct?: CareerRoadmapScalarFieldEnum | CareerRoadmapScalarFieldEnum[]
  }

  /**
   * CareerRoadmap findFirstOrThrow
   */
  export type CareerRoadmapFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CareerRoadmap
     */
    select?: CareerRoadmapSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CareerRoadmap
     */
    omit?: CareerRoadmapOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CareerRoadmapInclude<ExtArgs> | null
    /**
     * Filter, which CareerRoadmap to fetch.
     */
    where?: CareerRoadmapWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CareerRoadmaps to fetch.
     */
    orderBy?: CareerRoadmapOrderByWithRelationInput | CareerRoadmapOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CareerRoadmaps.
     */
    cursor?: CareerRoadmapWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CareerRoadmaps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CareerRoadmaps.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CareerRoadmaps.
     */
    distinct?: CareerRoadmapScalarFieldEnum | CareerRoadmapScalarFieldEnum[]
  }

  /**
   * CareerRoadmap findMany
   */
  export type CareerRoadmapFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CareerRoadmap
     */
    select?: CareerRoadmapSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CareerRoadmap
     */
    omit?: CareerRoadmapOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CareerRoadmapInclude<ExtArgs> | null
    /**
     * Filter, which CareerRoadmaps to fetch.
     */
    where?: CareerRoadmapWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CareerRoadmaps to fetch.
     */
    orderBy?: CareerRoadmapOrderByWithRelationInput | CareerRoadmapOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CareerRoadmaps.
     */
    cursor?: CareerRoadmapWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CareerRoadmaps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CareerRoadmaps.
     */
    skip?: number
    distinct?: CareerRoadmapScalarFieldEnum | CareerRoadmapScalarFieldEnum[]
  }

  /**
   * CareerRoadmap create
   */
  export type CareerRoadmapCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CareerRoadmap
     */
    select?: CareerRoadmapSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CareerRoadmap
     */
    omit?: CareerRoadmapOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CareerRoadmapInclude<ExtArgs> | null
    /**
     * The data needed to create a CareerRoadmap.
     */
    data: XOR<CareerRoadmapCreateInput, CareerRoadmapUncheckedCreateInput>
  }

  /**
   * CareerRoadmap createMany
   */
  export type CareerRoadmapCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CareerRoadmaps.
     */
    data: CareerRoadmapCreateManyInput | CareerRoadmapCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CareerRoadmap createManyAndReturn
   */
  export type CareerRoadmapCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CareerRoadmap
     */
    select?: CareerRoadmapSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CareerRoadmap
     */
    omit?: CareerRoadmapOmit<ExtArgs> | null
    /**
     * The data used to create many CareerRoadmaps.
     */
    data: CareerRoadmapCreateManyInput | CareerRoadmapCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CareerRoadmapIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CareerRoadmap update
   */
  export type CareerRoadmapUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CareerRoadmap
     */
    select?: CareerRoadmapSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CareerRoadmap
     */
    omit?: CareerRoadmapOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CareerRoadmapInclude<ExtArgs> | null
    /**
     * The data needed to update a CareerRoadmap.
     */
    data: XOR<CareerRoadmapUpdateInput, CareerRoadmapUncheckedUpdateInput>
    /**
     * Choose, which CareerRoadmap to update.
     */
    where: CareerRoadmapWhereUniqueInput
  }

  /**
   * CareerRoadmap updateMany
   */
  export type CareerRoadmapUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CareerRoadmaps.
     */
    data: XOR<CareerRoadmapUpdateManyMutationInput, CareerRoadmapUncheckedUpdateManyInput>
    /**
     * Filter which CareerRoadmaps to update
     */
    where?: CareerRoadmapWhereInput
    /**
     * Limit how many CareerRoadmaps to update.
     */
    limit?: number
  }

  /**
   * CareerRoadmap updateManyAndReturn
   */
  export type CareerRoadmapUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CareerRoadmap
     */
    select?: CareerRoadmapSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CareerRoadmap
     */
    omit?: CareerRoadmapOmit<ExtArgs> | null
    /**
     * The data used to update CareerRoadmaps.
     */
    data: XOR<CareerRoadmapUpdateManyMutationInput, CareerRoadmapUncheckedUpdateManyInput>
    /**
     * Filter which CareerRoadmaps to update
     */
    where?: CareerRoadmapWhereInput
    /**
     * Limit how many CareerRoadmaps to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CareerRoadmapIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * CareerRoadmap upsert
   */
  export type CareerRoadmapUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CareerRoadmap
     */
    select?: CareerRoadmapSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CareerRoadmap
     */
    omit?: CareerRoadmapOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CareerRoadmapInclude<ExtArgs> | null
    /**
     * The filter to search for the CareerRoadmap to update in case it exists.
     */
    where: CareerRoadmapWhereUniqueInput
    /**
     * In case the CareerRoadmap found by the `where` argument doesn't exist, create a new CareerRoadmap with this data.
     */
    create: XOR<CareerRoadmapCreateInput, CareerRoadmapUncheckedCreateInput>
    /**
     * In case the CareerRoadmap was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CareerRoadmapUpdateInput, CareerRoadmapUncheckedUpdateInput>
  }

  /**
   * CareerRoadmap delete
   */
  export type CareerRoadmapDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CareerRoadmap
     */
    select?: CareerRoadmapSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CareerRoadmap
     */
    omit?: CareerRoadmapOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CareerRoadmapInclude<ExtArgs> | null
    /**
     * Filter which CareerRoadmap to delete.
     */
    where: CareerRoadmapWhereUniqueInput
  }

  /**
   * CareerRoadmap deleteMany
   */
  export type CareerRoadmapDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CareerRoadmaps to delete
     */
    where?: CareerRoadmapWhereInput
    /**
     * Limit how many CareerRoadmaps to delete.
     */
    limit?: number
  }

  /**
   * CareerRoadmap.milestones
   */
  export type CareerRoadmap$milestonesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoadmapMilestone
     */
    select?: RoadmapMilestoneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoadmapMilestone
     */
    omit?: RoadmapMilestoneOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoadmapMilestoneInclude<ExtArgs> | null
    where?: RoadmapMilestoneWhereInput
    orderBy?: RoadmapMilestoneOrderByWithRelationInput | RoadmapMilestoneOrderByWithRelationInput[]
    cursor?: RoadmapMilestoneWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RoadmapMilestoneScalarFieldEnum | RoadmapMilestoneScalarFieldEnum[]
  }

  /**
   * CareerRoadmap without action
   */
  export type CareerRoadmapDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CareerRoadmap
     */
    select?: CareerRoadmapSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CareerRoadmap
     */
    omit?: CareerRoadmapOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CareerRoadmapInclude<ExtArgs> | null
  }


  /**
   * Model RoadmapMilestone
   */

  export type AggregateRoadmapMilestone = {
    _count: RoadmapMilestoneCountAggregateOutputType | null
    _avg: RoadmapMilestoneAvgAggregateOutputType | null
    _sum: RoadmapMilestoneSumAggregateOutputType | null
    _min: RoadmapMilestoneMinAggregateOutputType | null
    _max: RoadmapMilestoneMaxAggregateOutputType | null
  }

  export type RoadmapMilestoneAvgAggregateOutputType = {
    monthNo: number | null
  }

  export type RoadmapMilestoneSumAggregateOutputType = {
    monthNo: number | null
  }

  export type RoadmapMilestoneMinAggregateOutputType = {
    id: string | null
    roadmapId: string | null
    monthNo: number | null
    title: string | null
  }

  export type RoadmapMilestoneMaxAggregateOutputType = {
    id: string | null
    roadmapId: string | null
    monthNo: number | null
    title: string | null
  }

  export type RoadmapMilestoneCountAggregateOutputType = {
    id: number
    roadmapId: number
    monthNo: number
    title: number
    weeksData: number
    _all: number
  }


  export type RoadmapMilestoneAvgAggregateInputType = {
    monthNo?: true
  }

  export type RoadmapMilestoneSumAggregateInputType = {
    monthNo?: true
  }

  export type RoadmapMilestoneMinAggregateInputType = {
    id?: true
    roadmapId?: true
    monthNo?: true
    title?: true
  }

  export type RoadmapMilestoneMaxAggregateInputType = {
    id?: true
    roadmapId?: true
    monthNo?: true
    title?: true
  }

  export type RoadmapMilestoneCountAggregateInputType = {
    id?: true
    roadmapId?: true
    monthNo?: true
    title?: true
    weeksData?: true
    _all?: true
  }

  export type RoadmapMilestoneAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RoadmapMilestone to aggregate.
     */
    where?: RoadmapMilestoneWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoadmapMilestones to fetch.
     */
    orderBy?: RoadmapMilestoneOrderByWithRelationInput | RoadmapMilestoneOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RoadmapMilestoneWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoadmapMilestones from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoadmapMilestones.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RoadmapMilestones
    **/
    _count?: true | RoadmapMilestoneCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RoadmapMilestoneAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RoadmapMilestoneSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RoadmapMilestoneMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RoadmapMilestoneMaxAggregateInputType
  }

  export type GetRoadmapMilestoneAggregateType<T extends RoadmapMilestoneAggregateArgs> = {
        [P in keyof T & keyof AggregateRoadmapMilestone]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRoadmapMilestone[P]>
      : GetScalarType<T[P], AggregateRoadmapMilestone[P]>
  }




  export type RoadmapMilestoneGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RoadmapMilestoneWhereInput
    orderBy?: RoadmapMilestoneOrderByWithAggregationInput | RoadmapMilestoneOrderByWithAggregationInput[]
    by: RoadmapMilestoneScalarFieldEnum[] | RoadmapMilestoneScalarFieldEnum
    having?: RoadmapMilestoneScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RoadmapMilestoneCountAggregateInputType | true
    _avg?: RoadmapMilestoneAvgAggregateInputType
    _sum?: RoadmapMilestoneSumAggregateInputType
    _min?: RoadmapMilestoneMinAggregateInputType
    _max?: RoadmapMilestoneMaxAggregateInputType
  }

  export type RoadmapMilestoneGroupByOutputType = {
    id: string
    roadmapId: string
    monthNo: number
    title: string
    weeksData: JsonValue
    _count: RoadmapMilestoneCountAggregateOutputType | null
    _avg: RoadmapMilestoneAvgAggregateOutputType | null
    _sum: RoadmapMilestoneSumAggregateOutputType | null
    _min: RoadmapMilestoneMinAggregateOutputType | null
    _max: RoadmapMilestoneMaxAggregateOutputType | null
  }

  type GetRoadmapMilestoneGroupByPayload<T extends RoadmapMilestoneGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RoadmapMilestoneGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RoadmapMilestoneGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RoadmapMilestoneGroupByOutputType[P]>
            : GetScalarType<T[P], RoadmapMilestoneGroupByOutputType[P]>
        }
      >
    >


  export type RoadmapMilestoneSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    roadmapId?: boolean
    monthNo?: boolean
    title?: boolean
    weeksData?: boolean
    roadmap?: boolean | CareerRoadmapDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["roadmapMilestone"]>

  export type RoadmapMilestoneSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    roadmapId?: boolean
    monthNo?: boolean
    title?: boolean
    weeksData?: boolean
    roadmap?: boolean | CareerRoadmapDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["roadmapMilestone"]>

  export type RoadmapMilestoneSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    roadmapId?: boolean
    monthNo?: boolean
    title?: boolean
    weeksData?: boolean
    roadmap?: boolean | CareerRoadmapDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["roadmapMilestone"]>

  export type RoadmapMilestoneSelectScalar = {
    id?: boolean
    roadmapId?: boolean
    monthNo?: boolean
    title?: boolean
    weeksData?: boolean
  }

  export type RoadmapMilestoneOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "roadmapId" | "monthNo" | "title" | "weeksData", ExtArgs["result"]["roadmapMilestone"]>
  export type RoadmapMilestoneInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    roadmap?: boolean | CareerRoadmapDefaultArgs<ExtArgs>
  }
  export type RoadmapMilestoneIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    roadmap?: boolean | CareerRoadmapDefaultArgs<ExtArgs>
  }
  export type RoadmapMilestoneIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    roadmap?: boolean | CareerRoadmapDefaultArgs<ExtArgs>
  }

  export type $RoadmapMilestonePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RoadmapMilestone"
    objects: {
      roadmap: Prisma.$CareerRoadmapPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      roadmapId: string
      monthNo: number
      title: string
      weeksData: Prisma.JsonValue
    }, ExtArgs["result"]["roadmapMilestone"]>
    composites: {}
  }

  type RoadmapMilestoneGetPayload<S extends boolean | null | undefined | RoadmapMilestoneDefaultArgs> = $Result.GetResult<Prisma.$RoadmapMilestonePayload, S>

  type RoadmapMilestoneCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RoadmapMilestoneFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RoadmapMilestoneCountAggregateInputType | true
    }

  export interface RoadmapMilestoneDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RoadmapMilestone'], meta: { name: 'RoadmapMilestone' } }
    /**
     * Find zero or one RoadmapMilestone that matches the filter.
     * @param {RoadmapMilestoneFindUniqueArgs} args - Arguments to find a RoadmapMilestone
     * @example
     * // Get one RoadmapMilestone
     * const roadmapMilestone = await prisma.roadmapMilestone.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RoadmapMilestoneFindUniqueArgs>(args: SelectSubset<T, RoadmapMilestoneFindUniqueArgs<ExtArgs>>): Prisma__RoadmapMilestoneClient<$Result.GetResult<Prisma.$RoadmapMilestonePayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one RoadmapMilestone that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RoadmapMilestoneFindUniqueOrThrowArgs} args - Arguments to find a RoadmapMilestone
     * @example
     * // Get one RoadmapMilestone
     * const roadmapMilestone = await prisma.roadmapMilestone.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RoadmapMilestoneFindUniqueOrThrowArgs>(args: SelectSubset<T, RoadmapMilestoneFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RoadmapMilestoneClient<$Result.GetResult<Prisma.$RoadmapMilestonePayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first RoadmapMilestone that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoadmapMilestoneFindFirstArgs} args - Arguments to find a RoadmapMilestone
     * @example
     * // Get one RoadmapMilestone
     * const roadmapMilestone = await prisma.roadmapMilestone.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RoadmapMilestoneFindFirstArgs>(args?: SelectSubset<T, RoadmapMilestoneFindFirstArgs<ExtArgs>>): Prisma__RoadmapMilestoneClient<$Result.GetResult<Prisma.$RoadmapMilestonePayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first RoadmapMilestone that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoadmapMilestoneFindFirstOrThrowArgs} args - Arguments to find a RoadmapMilestone
     * @example
     * // Get one RoadmapMilestone
     * const roadmapMilestone = await prisma.roadmapMilestone.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RoadmapMilestoneFindFirstOrThrowArgs>(args?: SelectSubset<T, RoadmapMilestoneFindFirstOrThrowArgs<ExtArgs>>): Prisma__RoadmapMilestoneClient<$Result.GetResult<Prisma.$RoadmapMilestonePayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more RoadmapMilestones that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoadmapMilestoneFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RoadmapMilestones
     * const roadmapMilestones = await prisma.roadmapMilestone.findMany()
     * 
     * // Get first 10 RoadmapMilestones
     * const roadmapMilestones = await prisma.roadmapMilestone.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const roadmapMilestoneWithIdOnly = await prisma.roadmapMilestone.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RoadmapMilestoneFindManyArgs>(args?: SelectSubset<T, RoadmapMilestoneFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoadmapMilestonePayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a RoadmapMilestone.
     * @param {RoadmapMilestoneCreateArgs} args - Arguments to create a RoadmapMilestone.
     * @example
     * // Create one RoadmapMilestone
     * const RoadmapMilestone = await prisma.roadmapMilestone.create({
     *   data: {
     *     // ... data to create a RoadmapMilestone
     *   }
     * })
     * 
     */
    create<T extends RoadmapMilestoneCreateArgs>(args: SelectSubset<T, RoadmapMilestoneCreateArgs<ExtArgs>>): Prisma__RoadmapMilestoneClient<$Result.GetResult<Prisma.$RoadmapMilestonePayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many RoadmapMilestones.
     * @param {RoadmapMilestoneCreateManyArgs} args - Arguments to create many RoadmapMilestones.
     * @example
     * // Create many RoadmapMilestones
     * const roadmapMilestone = await prisma.roadmapMilestone.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RoadmapMilestoneCreateManyArgs>(args?: SelectSubset<T, RoadmapMilestoneCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RoadmapMilestones and returns the data saved in the database.
     * @param {RoadmapMilestoneCreateManyAndReturnArgs} args - Arguments to create many RoadmapMilestones.
     * @example
     * // Create many RoadmapMilestones
     * const roadmapMilestone = await prisma.roadmapMilestone.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RoadmapMilestones and only return the `id`
     * const roadmapMilestoneWithIdOnly = await prisma.roadmapMilestone.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RoadmapMilestoneCreateManyAndReturnArgs>(args?: SelectSubset<T, RoadmapMilestoneCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoadmapMilestonePayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a RoadmapMilestone.
     * @param {RoadmapMilestoneDeleteArgs} args - Arguments to delete one RoadmapMilestone.
     * @example
     * // Delete one RoadmapMilestone
     * const RoadmapMilestone = await prisma.roadmapMilestone.delete({
     *   where: {
     *     // ... filter to delete one RoadmapMilestone
     *   }
     * })
     * 
     */
    delete<T extends RoadmapMilestoneDeleteArgs>(args: SelectSubset<T, RoadmapMilestoneDeleteArgs<ExtArgs>>): Prisma__RoadmapMilestoneClient<$Result.GetResult<Prisma.$RoadmapMilestonePayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one RoadmapMilestone.
     * @param {RoadmapMilestoneUpdateArgs} args - Arguments to update one RoadmapMilestone.
     * @example
     * // Update one RoadmapMilestone
     * const roadmapMilestone = await prisma.roadmapMilestone.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RoadmapMilestoneUpdateArgs>(args: SelectSubset<T, RoadmapMilestoneUpdateArgs<ExtArgs>>): Prisma__RoadmapMilestoneClient<$Result.GetResult<Prisma.$RoadmapMilestonePayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more RoadmapMilestones.
     * @param {RoadmapMilestoneDeleteManyArgs} args - Arguments to filter RoadmapMilestones to delete.
     * @example
     * // Delete a few RoadmapMilestones
     * const { count } = await prisma.roadmapMilestone.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RoadmapMilestoneDeleteManyArgs>(args?: SelectSubset<T, RoadmapMilestoneDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RoadmapMilestones.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoadmapMilestoneUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RoadmapMilestones
     * const roadmapMilestone = await prisma.roadmapMilestone.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RoadmapMilestoneUpdateManyArgs>(args: SelectSubset<T, RoadmapMilestoneUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RoadmapMilestones and returns the data updated in the database.
     * @param {RoadmapMilestoneUpdateManyAndReturnArgs} args - Arguments to update many RoadmapMilestones.
     * @example
     * // Update many RoadmapMilestones
     * const roadmapMilestone = await prisma.roadmapMilestone.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more RoadmapMilestones and only return the `id`
     * const roadmapMilestoneWithIdOnly = await prisma.roadmapMilestone.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RoadmapMilestoneUpdateManyAndReturnArgs>(args: SelectSubset<T, RoadmapMilestoneUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoadmapMilestonePayload<ExtArgs>, T, "updateManyAndReturn", ClientOptions>>

    /**
     * Create or update one RoadmapMilestone.
     * @param {RoadmapMilestoneUpsertArgs} args - Arguments to update or create a RoadmapMilestone.
     * @example
     * // Update or create a RoadmapMilestone
     * const roadmapMilestone = await prisma.roadmapMilestone.upsert({
     *   create: {
     *     // ... data to create a RoadmapMilestone
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RoadmapMilestone we want to update
     *   }
     * })
     */
    upsert<T extends RoadmapMilestoneUpsertArgs>(args: SelectSubset<T, RoadmapMilestoneUpsertArgs<ExtArgs>>): Prisma__RoadmapMilestoneClient<$Result.GetResult<Prisma.$RoadmapMilestonePayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of RoadmapMilestones.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoadmapMilestoneCountArgs} args - Arguments to filter RoadmapMilestones to count.
     * @example
     * // Count the number of RoadmapMilestones
     * const count = await prisma.roadmapMilestone.count({
     *   where: {
     *     // ... the filter for the RoadmapMilestones we want to count
     *   }
     * })
    **/
    count<T extends RoadmapMilestoneCountArgs>(
      args?: Subset<T, RoadmapMilestoneCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RoadmapMilestoneCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RoadmapMilestone.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoadmapMilestoneAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RoadmapMilestoneAggregateArgs>(args: Subset<T, RoadmapMilestoneAggregateArgs>): Prisma.PrismaPromise<GetRoadmapMilestoneAggregateType<T>>

    /**
     * Group by RoadmapMilestone.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoadmapMilestoneGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RoadmapMilestoneGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RoadmapMilestoneGroupByArgs['orderBy'] }
        : { orderBy?: RoadmapMilestoneGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RoadmapMilestoneGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRoadmapMilestoneGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RoadmapMilestone model
   */
  readonly fields: RoadmapMilestoneFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RoadmapMilestone.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RoadmapMilestoneClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    roadmap<T extends CareerRoadmapDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CareerRoadmapDefaultArgs<ExtArgs>>): Prisma__CareerRoadmapClient<$Result.GetResult<Prisma.$CareerRoadmapPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | Null, Null, ExtArgs, ClientOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the RoadmapMilestone model
   */ 
  interface RoadmapMilestoneFieldRefs {
    readonly id: FieldRef<"RoadmapMilestone", 'String'>
    readonly roadmapId: FieldRef<"RoadmapMilestone", 'String'>
    readonly monthNo: FieldRef<"RoadmapMilestone", 'Int'>
    readonly title: FieldRef<"RoadmapMilestone", 'String'>
    readonly weeksData: FieldRef<"RoadmapMilestone", 'Json'>
  }
    

  // Custom InputTypes
  /**
   * RoadmapMilestone findUnique
   */
  export type RoadmapMilestoneFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoadmapMilestone
     */
    select?: RoadmapMilestoneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoadmapMilestone
     */
    omit?: RoadmapMilestoneOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoadmapMilestoneInclude<ExtArgs> | null
    /**
     * Filter, which RoadmapMilestone to fetch.
     */
    where: RoadmapMilestoneWhereUniqueInput
  }

  /**
   * RoadmapMilestone findUniqueOrThrow
   */
  export type RoadmapMilestoneFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoadmapMilestone
     */
    select?: RoadmapMilestoneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoadmapMilestone
     */
    omit?: RoadmapMilestoneOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoadmapMilestoneInclude<ExtArgs> | null
    /**
     * Filter, which RoadmapMilestone to fetch.
     */
    where: RoadmapMilestoneWhereUniqueInput
  }

  /**
   * RoadmapMilestone findFirst
   */
  export type RoadmapMilestoneFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoadmapMilestone
     */
    select?: RoadmapMilestoneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoadmapMilestone
     */
    omit?: RoadmapMilestoneOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoadmapMilestoneInclude<ExtArgs> | null
    /**
     * Filter, which RoadmapMilestone to fetch.
     */
    where?: RoadmapMilestoneWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoadmapMilestones to fetch.
     */
    orderBy?: RoadmapMilestoneOrderByWithRelationInput | RoadmapMilestoneOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RoadmapMilestones.
     */
    cursor?: RoadmapMilestoneWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoadmapMilestones from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoadmapMilestones.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RoadmapMilestones.
     */
    distinct?: RoadmapMilestoneScalarFieldEnum | RoadmapMilestoneScalarFieldEnum[]
  }

  /**
   * RoadmapMilestone findFirstOrThrow
   */
  export type RoadmapMilestoneFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoadmapMilestone
     */
    select?: RoadmapMilestoneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoadmapMilestone
     */
    omit?: RoadmapMilestoneOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoadmapMilestoneInclude<ExtArgs> | null
    /**
     * Filter, which RoadmapMilestone to fetch.
     */
    where?: RoadmapMilestoneWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoadmapMilestones to fetch.
     */
    orderBy?: RoadmapMilestoneOrderByWithRelationInput | RoadmapMilestoneOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RoadmapMilestones.
     */
    cursor?: RoadmapMilestoneWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoadmapMilestones from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoadmapMilestones.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RoadmapMilestones.
     */
    distinct?: RoadmapMilestoneScalarFieldEnum | RoadmapMilestoneScalarFieldEnum[]
  }

  /**
   * RoadmapMilestone findMany
   */
  export type RoadmapMilestoneFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoadmapMilestone
     */
    select?: RoadmapMilestoneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoadmapMilestone
     */
    omit?: RoadmapMilestoneOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoadmapMilestoneInclude<ExtArgs> | null
    /**
     * Filter, which RoadmapMilestones to fetch.
     */
    where?: RoadmapMilestoneWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoadmapMilestones to fetch.
     */
    orderBy?: RoadmapMilestoneOrderByWithRelationInput | RoadmapMilestoneOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RoadmapMilestones.
     */
    cursor?: RoadmapMilestoneWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoadmapMilestones from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoadmapMilestones.
     */
    skip?: number
    distinct?: RoadmapMilestoneScalarFieldEnum | RoadmapMilestoneScalarFieldEnum[]
  }

  /**
   * RoadmapMilestone create
   */
  export type RoadmapMilestoneCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoadmapMilestone
     */
    select?: RoadmapMilestoneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoadmapMilestone
     */
    omit?: RoadmapMilestoneOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoadmapMilestoneInclude<ExtArgs> | null
    /**
     * The data needed to create a RoadmapMilestone.
     */
    data: XOR<RoadmapMilestoneCreateInput, RoadmapMilestoneUncheckedCreateInput>
  }

  /**
   * RoadmapMilestone createMany
   */
  export type RoadmapMilestoneCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RoadmapMilestones.
     */
    data: RoadmapMilestoneCreateManyInput | RoadmapMilestoneCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RoadmapMilestone createManyAndReturn
   */
  export type RoadmapMilestoneCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoadmapMilestone
     */
    select?: RoadmapMilestoneSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RoadmapMilestone
     */
    omit?: RoadmapMilestoneOmit<ExtArgs> | null
    /**
     * The data used to create many RoadmapMilestones.
     */
    data: RoadmapMilestoneCreateManyInput | RoadmapMilestoneCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoadmapMilestoneIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * RoadmapMilestone update
   */
  export type RoadmapMilestoneUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoadmapMilestone
     */
    select?: RoadmapMilestoneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoadmapMilestone
     */
    omit?: RoadmapMilestoneOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoadmapMilestoneInclude<ExtArgs> | null
    /**
     * The data needed to update a RoadmapMilestone.
     */
    data: XOR<RoadmapMilestoneUpdateInput, RoadmapMilestoneUncheckedUpdateInput>
    /**
     * Choose, which RoadmapMilestone to update.
     */
    where: RoadmapMilestoneWhereUniqueInput
  }

  /**
   * RoadmapMilestone updateMany
   */
  export type RoadmapMilestoneUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RoadmapMilestones.
     */
    data: XOR<RoadmapMilestoneUpdateManyMutationInput, RoadmapMilestoneUncheckedUpdateManyInput>
    /**
     * Filter which RoadmapMilestones to update
     */
    where?: RoadmapMilestoneWhereInput
    /**
     * Limit how many RoadmapMilestones to update.
     */
    limit?: number
  }

  /**
   * RoadmapMilestone updateManyAndReturn
   */
  export type RoadmapMilestoneUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoadmapMilestone
     */
    select?: RoadmapMilestoneSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RoadmapMilestone
     */
    omit?: RoadmapMilestoneOmit<ExtArgs> | null
    /**
     * The data used to update RoadmapMilestones.
     */
    data: XOR<RoadmapMilestoneUpdateManyMutationInput, RoadmapMilestoneUncheckedUpdateManyInput>
    /**
     * Filter which RoadmapMilestones to update
     */
    where?: RoadmapMilestoneWhereInput
    /**
     * Limit how many RoadmapMilestones to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoadmapMilestoneIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * RoadmapMilestone upsert
   */
  export type RoadmapMilestoneUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoadmapMilestone
     */
    select?: RoadmapMilestoneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoadmapMilestone
     */
    omit?: RoadmapMilestoneOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoadmapMilestoneInclude<ExtArgs> | null
    /**
     * The filter to search for the RoadmapMilestone to update in case it exists.
     */
    where: RoadmapMilestoneWhereUniqueInput
    /**
     * In case the RoadmapMilestone found by the `where` argument doesn't exist, create a new RoadmapMilestone with this data.
     */
    create: XOR<RoadmapMilestoneCreateInput, RoadmapMilestoneUncheckedCreateInput>
    /**
     * In case the RoadmapMilestone was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RoadmapMilestoneUpdateInput, RoadmapMilestoneUncheckedUpdateInput>
  }

  /**
   * RoadmapMilestone delete
   */
  export type RoadmapMilestoneDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoadmapMilestone
     */
    select?: RoadmapMilestoneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoadmapMilestone
     */
    omit?: RoadmapMilestoneOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoadmapMilestoneInclude<ExtArgs> | null
    /**
     * Filter which RoadmapMilestone to delete.
     */
    where: RoadmapMilestoneWhereUniqueInput
  }

  /**
   * RoadmapMilestone deleteMany
   */
  export type RoadmapMilestoneDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RoadmapMilestones to delete
     */
    where?: RoadmapMilestoneWhereInput
    /**
     * Limit how many RoadmapMilestones to delete.
     */
    limit?: number
  }

  /**
   * RoadmapMilestone without action
   */
  export type RoadmapMilestoneDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoadmapMilestone
     */
    select?: RoadmapMilestoneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoadmapMilestone
     */
    omit?: RoadmapMilestoneOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoadmapMilestoneInclude<ExtArgs> | null
  }


  /**
   * Model InterviewSession
   */

  export type AggregateInterviewSession = {
    _count: InterviewSessionCountAggregateOutputType | null
    _avg: InterviewSessionAvgAggregateOutputType | null
    _sum: InterviewSessionSumAggregateOutputType | null
    _min: InterviewSessionMinAggregateOutputType | null
    _max: InterviewSessionMaxAggregateOutputType | null
  }

  export type InterviewSessionAvgAggregateOutputType = {
    overallScore: number | null
  }

  export type InterviewSessionSumAggregateOutputType = {
    overallScore: number | null
  }

  export type InterviewSessionMinAggregateOutputType = {
    id: string | null
    userId: string | null
    roleContext: string | null
    overallScore: number | null
    readinessLevel: string | null
    createdAt: Date | null
  }

  export type InterviewSessionMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    roleContext: string | null
    overallScore: number | null
    readinessLevel: string | null
    createdAt: Date | null
  }

  export type InterviewSessionCountAggregateOutputType = {
    id: number
    userId: number
    roleContext: number
    overallScore: number
    readinessLevel: number
    strengths: number
    improvements: number
    createdAt: number
    _all: number
  }


  export type InterviewSessionAvgAggregateInputType = {
    overallScore?: true
  }

  export type InterviewSessionSumAggregateInputType = {
    overallScore?: true
  }

  export type InterviewSessionMinAggregateInputType = {
    id?: true
    userId?: true
    roleContext?: true
    overallScore?: true
    readinessLevel?: true
    createdAt?: true
  }

  export type InterviewSessionMaxAggregateInputType = {
    id?: true
    userId?: true
    roleContext?: true
    overallScore?: true
    readinessLevel?: true
    createdAt?: true
  }

  export type InterviewSessionCountAggregateInputType = {
    id?: true
    userId?: true
    roleContext?: true
    overallScore?: true
    readinessLevel?: true
    strengths?: true
    improvements?: true
    createdAt?: true
    _all?: true
  }

  export type InterviewSessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which InterviewSession to aggregate.
     */
    where?: InterviewSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InterviewSessions to fetch.
     */
    orderBy?: InterviewSessionOrderByWithRelationInput | InterviewSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: InterviewSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InterviewSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InterviewSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned InterviewSessions
    **/
    _count?: true | InterviewSessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: InterviewSessionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: InterviewSessionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: InterviewSessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: InterviewSessionMaxAggregateInputType
  }

  export type GetInterviewSessionAggregateType<T extends InterviewSessionAggregateArgs> = {
        [P in keyof T & keyof AggregateInterviewSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateInterviewSession[P]>
      : GetScalarType<T[P], AggregateInterviewSession[P]>
  }




  export type InterviewSessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InterviewSessionWhereInput
    orderBy?: InterviewSessionOrderByWithAggregationInput | InterviewSessionOrderByWithAggregationInput[]
    by: InterviewSessionScalarFieldEnum[] | InterviewSessionScalarFieldEnum
    having?: InterviewSessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: InterviewSessionCountAggregateInputType | true
    _avg?: InterviewSessionAvgAggregateInputType
    _sum?: InterviewSessionSumAggregateInputType
    _min?: InterviewSessionMinAggregateInputType
    _max?: InterviewSessionMaxAggregateInputType
  }

  export type InterviewSessionGroupByOutputType = {
    id: string
    userId: string
    roleContext: string
    overallScore: number | null
    readinessLevel: string | null
    strengths: string[]
    improvements: string[]
    createdAt: Date
    _count: InterviewSessionCountAggregateOutputType | null
    _avg: InterviewSessionAvgAggregateOutputType | null
    _sum: InterviewSessionSumAggregateOutputType | null
    _min: InterviewSessionMinAggregateOutputType | null
    _max: InterviewSessionMaxAggregateOutputType | null
  }

  type GetInterviewSessionGroupByPayload<T extends InterviewSessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<InterviewSessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof InterviewSessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], InterviewSessionGroupByOutputType[P]>
            : GetScalarType<T[P], InterviewSessionGroupByOutputType[P]>
        }
      >
    >


  export type InterviewSessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    roleContext?: boolean
    overallScore?: boolean
    readinessLevel?: boolean
    strengths?: boolean
    improvements?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    questions?: boolean | InterviewSession$questionsArgs<ExtArgs>
    _count?: boolean | InterviewSessionCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["interviewSession"]>

  export type InterviewSessionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    roleContext?: boolean
    overallScore?: boolean
    readinessLevel?: boolean
    strengths?: boolean
    improvements?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["interviewSession"]>

  export type InterviewSessionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    roleContext?: boolean
    overallScore?: boolean
    readinessLevel?: boolean
    strengths?: boolean
    improvements?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["interviewSession"]>

  export type InterviewSessionSelectScalar = {
    id?: boolean
    userId?: boolean
    roleContext?: boolean
    overallScore?: boolean
    readinessLevel?: boolean
    strengths?: boolean
    improvements?: boolean
    createdAt?: boolean
  }

  export type InterviewSessionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "roleContext" | "overallScore" | "readinessLevel" | "strengths" | "improvements" | "createdAt", ExtArgs["result"]["interviewSession"]>
  export type InterviewSessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    questions?: boolean | InterviewSession$questionsArgs<ExtArgs>
    _count?: boolean | InterviewSessionCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type InterviewSessionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type InterviewSessionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $InterviewSessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "InterviewSession"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      questions: Prisma.$InterviewQuestionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      roleContext: string
      overallScore: number | null
      readinessLevel: string | null
      strengths: string[]
      improvements: string[]
      createdAt: Date
    }, ExtArgs["result"]["interviewSession"]>
    composites: {}
  }

  type InterviewSessionGetPayload<S extends boolean | null | undefined | InterviewSessionDefaultArgs> = $Result.GetResult<Prisma.$InterviewSessionPayload, S>

  type InterviewSessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<InterviewSessionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: InterviewSessionCountAggregateInputType | true
    }

  export interface InterviewSessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['InterviewSession'], meta: { name: 'InterviewSession' } }
    /**
     * Find zero or one InterviewSession that matches the filter.
     * @param {InterviewSessionFindUniqueArgs} args - Arguments to find a InterviewSession
     * @example
     * // Get one InterviewSession
     * const interviewSession = await prisma.interviewSession.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends InterviewSessionFindUniqueArgs>(args: SelectSubset<T, InterviewSessionFindUniqueArgs<ExtArgs>>): Prisma__InterviewSessionClient<$Result.GetResult<Prisma.$InterviewSessionPayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one InterviewSession that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {InterviewSessionFindUniqueOrThrowArgs} args - Arguments to find a InterviewSession
     * @example
     * // Get one InterviewSession
     * const interviewSession = await prisma.interviewSession.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends InterviewSessionFindUniqueOrThrowArgs>(args: SelectSubset<T, InterviewSessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__InterviewSessionClient<$Result.GetResult<Prisma.$InterviewSessionPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first InterviewSession that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InterviewSessionFindFirstArgs} args - Arguments to find a InterviewSession
     * @example
     * // Get one InterviewSession
     * const interviewSession = await prisma.interviewSession.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends InterviewSessionFindFirstArgs>(args?: SelectSubset<T, InterviewSessionFindFirstArgs<ExtArgs>>): Prisma__InterviewSessionClient<$Result.GetResult<Prisma.$InterviewSessionPayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first InterviewSession that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InterviewSessionFindFirstOrThrowArgs} args - Arguments to find a InterviewSession
     * @example
     * // Get one InterviewSession
     * const interviewSession = await prisma.interviewSession.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends InterviewSessionFindFirstOrThrowArgs>(args?: SelectSubset<T, InterviewSessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__InterviewSessionClient<$Result.GetResult<Prisma.$InterviewSessionPayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more InterviewSessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InterviewSessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all InterviewSessions
     * const interviewSessions = await prisma.interviewSession.findMany()
     * 
     * // Get first 10 InterviewSessions
     * const interviewSessions = await prisma.interviewSession.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const interviewSessionWithIdOnly = await prisma.interviewSession.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends InterviewSessionFindManyArgs>(args?: SelectSubset<T, InterviewSessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InterviewSessionPayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a InterviewSession.
     * @param {InterviewSessionCreateArgs} args - Arguments to create a InterviewSession.
     * @example
     * // Create one InterviewSession
     * const InterviewSession = await prisma.interviewSession.create({
     *   data: {
     *     // ... data to create a InterviewSession
     *   }
     * })
     * 
     */
    create<T extends InterviewSessionCreateArgs>(args: SelectSubset<T, InterviewSessionCreateArgs<ExtArgs>>): Prisma__InterviewSessionClient<$Result.GetResult<Prisma.$InterviewSessionPayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many InterviewSessions.
     * @param {InterviewSessionCreateManyArgs} args - Arguments to create many InterviewSessions.
     * @example
     * // Create many InterviewSessions
     * const interviewSession = await prisma.interviewSession.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends InterviewSessionCreateManyArgs>(args?: SelectSubset<T, InterviewSessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many InterviewSessions and returns the data saved in the database.
     * @param {InterviewSessionCreateManyAndReturnArgs} args - Arguments to create many InterviewSessions.
     * @example
     * // Create many InterviewSessions
     * const interviewSession = await prisma.interviewSession.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many InterviewSessions and only return the `id`
     * const interviewSessionWithIdOnly = await prisma.interviewSession.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends InterviewSessionCreateManyAndReturnArgs>(args?: SelectSubset<T, InterviewSessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InterviewSessionPayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a InterviewSession.
     * @param {InterviewSessionDeleteArgs} args - Arguments to delete one InterviewSession.
     * @example
     * // Delete one InterviewSession
     * const InterviewSession = await prisma.interviewSession.delete({
     *   where: {
     *     // ... filter to delete one InterviewSession
     *   }
     * })
     * 
     */
    delete<T extends InterviewSessionDeleteArgs>(args: SelectSubset<T, InterviewSessionDeleteArgs<ExtArgs>>): Prisma__InterviewSessionClient<$Result.GetResult<Prisma.$InterviewSessionPayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one InterviewSession.
     * @param {InterviewSessionUpdateArgs} args - Arguments to update one InterviewSession.
     * @example
     * // Update one InterviewSession
     * const interviewSession = await prisma.interviewSession.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends InterviewSessionUpdateArgs>(args: SelectSubset<T, InterviewSessionUpdateArgs<ExtArgs>>): Prisma__InterviewSessionClient<$Result.GetResult<Prisma.$InterviewSessionPayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more InterviewSessions.
     * @param {InterviewSessionDeleteManyArgs} args - Arguments to filter InterviewSessions to delete.
     * @example
     * // Delete a few InterviewSessions
     * const { count } = await prisma.interviewSession.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends InterviewSessionDeleteManyArgs>(args?: SelectSubset<T, InterviewSessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more InterviewSessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InterviewSessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many InterviewSessions
     * const interviewSession = await prisma.interviewSession.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends InterviewSessionUpdateManyArgs>(args: SelectSubset<T, InterviewSessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more InterviewSessions and returns the data updated in the database.
     * @param {InterviewSessionUpdateManyAndReturnArgs} args - Arguments to update many InterviewSessions.
     * @example
     * // Update many InterviewSessions
     * const interviewSession = await prisma.interviewSession.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more InterviewSessions and only return the `id`
     * const interviewSessionWithIdOnly = await prisma.interviewSession.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends InterviewSessionUpdateManyAndReturnArgs>(args: SelectSubset<T, InterviewSessionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InterviewSessionPayload<ExtArgs>, T, "updateManyAndReturn", ClientOptions>>

    /**
     * Create or update one InterviewSession.
     * @param {InterviewSessionUpsertArgs} args - Arguments to update or create a InterviewSession.
     * @example
     * // Update or create a InterviewSession
     * const interviewSession = await prisma.interviewSession.upsert({
     *   create: {
     *     // ... data to create a InterviewSession
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the InterviewSession we want to update
     *   }
     * })
     */
    upsert<T extends InterviewSessionUpsertArgs>(args: SelectSubset<T, InterviewSessionUpsertArgs<ExtArgs>>): Prisma__InterviewSessionClient<$Result.GetResult<Prisma.$InterviewSessionPayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of InterviewSessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InterviewSessionCountArgs} args - Arguments to filter InterviewSessions to count.
     * @example
     * // Count the number of InterviewSessions
     * const count = await prisma.interviewSession.count({
     *   where: {
     *     // ... the filter for the InterviewSessions we want to count
     *   }
     * })
    **/
    count<T extends InterviewSessionCountArgs>(
      args?: Subset<T, InterviewSessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], InterviewSessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a InterviewSession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InterviewSessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends InterviewSessionAggregateArgs>(args: Subset<T, InterviewSessionAggregateArgs>): Prisma.PrismaPromise<GetInterviewSessionAggregateType<T>>

    /**
     * Group by InterviewSession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InterviewSessionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends InterviewSessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: InterviewSessionGroupByArgs['orderBy'] }
        : { orderBy?: InterviewSessionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, InterviewSessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInterviewSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the InterviewSession model
   */
  readonly fields: InterviewSessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for InterviewSession.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__InterviewSessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | Null, Null, ExtArgs, ClientOptions>
    questions<T extends InterviewSession$questionsArgs<ExtArgs> = {}>(args?: Subset<T, InterviewSession$questionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InterviewQuestionPayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the InterviewSession model
   */ 
  interface InterviewSessionFieldRefs {
    readonly id: FieldRef<"InterviewSession", 'String'>
    readonly userId: FieldRef<"InterviewSession", 'String'>
    readonly roleContext: FieldRef<"InterviewSession", 'String'>
    readonly overallScore: FieldRef<"InterviewSession", 'Int'>
    readonly readinessLevel: FieldRef<"InterviewSession", 'String'>
    readonly strengths: FieldRef<"InterviewSession", 'String[]'>
    readonly improvements: FieldRef<"InterviewSession", 'String[]'>
    readonly createdAt: FieldRef<"InterviewSession", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * InterviewSession findUnique
   */
  export type InterviewSessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InterviewSession
     */
    select?: InterviewSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InterviewSession
     */
    omit?: InterviewSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InterviewSessionInclude<ExtArgs> | null
    /**
     * Filter, which InterviewSession to fetch.
     */
    where: InterviewSessionWhereUniqueInput
  }

  /**
   * InterviewSession findUniqueOrThrow
   */
  export type InterviewSessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InterviewSession
     */
    select?: InterviewSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InterviewSession
     */
    omit?: InterviewSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InterviewSessionInclude<ExtArgs> | null
    /**
     * Filter, which InterviewSession to fetch.
     */
    where: InterviewSessionWhereUniqueInput
  }

  /**
   * InterviewSession findFirst
   */
  export type InterviewSessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InterviewSession
     */
    select?: InterviewSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InterviewSession
     */
    omit?: InterviewSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InterviewSessionInclude<ExtArgs> | null
    /**
     * Filter, which InterviewSession to fetch.
     */
    where?: InterviewSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InterviewSessions to fetch.
     */
    orderBy?: InterviewSessionOrderByWithRelationInput | InterviewSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for InterviewSessions.
     */
    cursor?: InterviewSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InterviewSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InterviewSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of InterviewSessions.
     */
    distinct?: InterviewSessionScalarFieldEnum | InterviewSessionScalarFieldEnum[]
  }

  /**
   * InterviewSession findFirstOrThrow
   */
  export type InterviewSessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InterviewSession
     */
    select?: InterviewSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InterviewSession
     */
    omit?: InterviewSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InterviewSessionInclude<ExtArgs> | null
    /**
     * Filter, which InterviewSession to fetch.
     */
    where?: InterviewSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InterviewSessions to fetch.
     */
    orderBy?: InterviewSessionOrderByWithRelationInput | InterviewSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for InterviewSessions.
     */
    cursor?: InterviewSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InterviewSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InterviewSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of InterviewSessions.
     */
    distinct?: InterviewSessionScalarFieldEnum | InterviewSessionScalarFieldEnum[]
  }

  /**
   * InterviewSession findMany
   */
  export type InterviewSessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InterviewSession
     */
    select?: InterviewSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InterviewSession
     */
    omit?: InterviewSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InterviewSessionInclude<ExtArgs> | null
    /**
     * Filter, which InterviewSessions to fetch.
     */
    where?: InterviewSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InterviewSessions to fetch.
     */
    orderBy?: InterviewSessionOrderByWithRelationInput | InterviewSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing InterviewSessions.
     */
    cursor?: InterviewSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InterviewSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InterviewSessions.
     */
    skip?: number
    distinct?: InterviewSessionScalarFieldEnum | InterviewSessionScalarFieldEnum[]
  }

  /**
   * InterviewSession create
   */
  export type InterviewSessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InterviewSession
     */
    select?: InterviewSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InterviewSession
     */
    omit?: InterviewSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InterviewSessionInclude<ExtArgs> | null
    /**
     * The data needed to create a InterviewSession.
     */
    data: XOR<InterviewSessionCreateInput, InterviewSessionUncheckedCreateInput>
  }

  /**
   * InterviewSession createMany
   */
  export type InterviewSessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many InterviewSessions.
     */
    data: InterviewSessionCreateManyInput | InterviewSessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * InterviewSession createManyAndReturn
   */
  export type InterviewSessionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InterviewSession
     */
    select?: InterviewSessionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the InterviewSession
     */
    omit?: InterviewSessionOmit<ExtArgs> | null
    /**
     * The data used to create many InterviewSessions.
     */
    data: InterviewSessionCreateManyInput | InterviewSessionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InterviewSessionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * InterviewSession update
   */
  export type InterviewSessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InterviewSession
     */
    select?: InterviewSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InterviewSession
     */
    omit?: InterviewSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InterviewSessionInclude<ExtArgs> | null
    /**
     * The data needed to update a InterviewSession.
     */
    data: XOR<InterviewSessionUpdateInput, InterviewSessionUncheckedUpdateInput>
    /**
     * Choose, which InterviewSession to update.
     */
    where: InterviewSessionWhereUniqueInput
  }

  /**
   * InterviewSession updateMany
   */
  export type InterviewSessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update InterviewSessions.
     */
    data: XOR<InterviewSessionUpdateManyMutationInput, InterviewSessionUncheckedUpdateManyInput>
    /**
     * Filter which InterviewSessions to update
     */
    where?: InterviewSessionWhereInput
    /**
     * Limit how many InterviewSessions to update.
     */
    limit?: number
  }

  /**
   * InterviewSession updateManyAndReturn
   */
  export type InterviewSessionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InterviewSession
     */
    select?: InterviewSessionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the InterviewSession
     */
    omit?: InterviewSessionOmit<ExtArgs> | null
    /**
     * The data used to update InterviewSessions.
     */
    data: XOR<InterviewSessionUpdateManyMutationInput, InterviewSessionUncheckedUpdateManyInput>
    /**
     * Filter which InterviewSessions to update
     */
    where?: InterviewSessionWhereInput
    /**
     * Limit how many InterviewSessions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InterviewSessionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * InterviewSession upsert
   */
  export type InterviewSessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InterviewSession
     */
    select?: InterviewSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InterviewSession
     */
    omit?: InterviewSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InterviewSessionInclude<ExtArgs> | null
    /**
     * The filter to search for the InterviewSession to update in case it exists.
     */
    where: InterviewSessionWhereUniqueInput
    /**
     * In case the InterviewSession found by the `where` argument doesn't exist, create a new InterviewSession with this data.
     */
    create: XOR<InterviewSessionCreateInput, InterviewSessionUncheckedCreateInput>
    /**
     * In case the InterviewSession was found with the provided `where` argument, update it with this data.
     */
    update: XOR<InterviewSessionUpdateInput, InterviewSessionUncheckedUpdateInput>
  }

  /**
   * InterviewSession delete
   */
  export type InterviewSessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InterviewSession
     */
    select?: InterviewSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InterviewSession
     */
    omit?: InterviewSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InterviewSessionInclude<ExtArgs> | null
    /**
     * Filter which InterviewSession to delete.
     */
    where: InterviewSessionWhereUniqueInput
  }

  /**
   * InterviewSession deleteMany
   */
  export type InterviewSessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which InterviewSessions to delete
     */
    where?: InterviewSessionWhereInput
    /**
     * Limit how many InterviewSessions to delete.
     */
    limit?: number
  }

  /**
   * InterviewSession.questions
   */
  export type InterviewSession$questionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InterviewQuestion
     */
    select?: InterviewQuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InterviewQuestion
     */
    omit?: InterviewQuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InterviewQuestionInclude<ExtArgs> | null
    where?: InterviewQuestionWhereInput
    orderBy?: InterviewQuestionOrderByWithRelationInput | InterviewQuestionOrderByWithRelationInput[]
    cursor?: InterviewQuestionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: InterviewQuestionScalarFieldEnum | InterviewQuestionScalarFieldEnum[]
  }

  /**
   * InterviewSession without action
   */
  export type InterviewSessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InterviewSession
     */
    select?: InterviewSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InterviewSession
     */
    omit?: InterviewSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InterviewSessionInclude<ExtArgs> | null
  }


  /**
   * Model InterviewQuestion
   */

  export type AggregateInterviewQuestion = {
    _count: InterviewQuestionCountAggregateOutputType | null
    _avg: InterviewQuestionAvgAggregateOutputType | null
    _sum: InterviewQuestionSumAggregateOutputType | null
    _min: InterviewQuestionMinAggregateOutputType | null
    _max: InterviewQuestionMaxAggregateOutputType | null
  }

  export type InterviewQuestionAvgAggregateOutputType = {
    rating: number | null
  }

  export type InterviewQuestionSumAggregateOutputType = {
    rating: number | null
  }

  export type InterviewQuestionMinAggregateOutputType = {
    id: string | null
    sessionId: string | null
    questionText: string | null
    answerText: string | null
    rating: number | null
    confidence: string | null
    feedbackText: string | null
  }

  export type InterviewQuestionMaxAggregateOutputType = {
    id: string | null
    sessionId: string | null
    questionText: string | null
    answerText: string | null
    rating: number | null
    confidence: string | null
    feedbackText: string | null
  }

  export type InterviewQuestionCountAggregateOutputType = {
    id: number
    sessionId: number
    questionText: number
    answerText: number
    rating: number
    confidence: number
    feedbackText: number
    _all: number
  }


  export type InterviewQuestionAvgAggregateInputType = {
    rating?: true
  }

  export type InterviewQuestionSumAggregateInputType = {
    rating?: true
  }

  export type InterviewQuestionMinAggregateInputType = {
    id?: true
    sessionId?: true
    questionText?: true
    answerText?: true
    rating?: true
    confidence?: true
    feedbackText?: true
  }

  export type InterviewQuestionMaxAggregateInputType = {
    id?: true
    sessionId?: true
    questionText?: true
    answerText?: true
    rating?: true
    confidence?: true
    feedbackText?: true
  }

  export type InterviewQuestionCountAggregateInputType = {
    id?: true
    sessionId?: true
    questionText?: true
    answerText?: true
    rating?: true
    confidence?: true
    feedbackText?: true
    _all?: true
  }

  export type InterviewQuestionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which InterviewQuestion to aggregate.
     */
    where?: InterviewQuestionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InterviewQuestions to fetch.
     */
    orderBy?: InterviewQuestionOrderByWithRelationInput | InterviewQuestionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: InterviewQuestionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InterviewQuestions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InterviewQuestions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned InterviewQuestions
    **/
    _count?: true | InterviewQuestionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: InterviewQuestionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: InterviewQuestionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: InterviewQuestionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: InterviewQuestionMaxAggregateInputType
  }

  export type GetInterviewQuestionAggregateType<T extends InterviewQuestionAggregateArgs> = {
        [P in keyof T & keyof AggregateInterviewQuestion]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateInterviewQuestion[P]>
      : GetScalarType<T[P], AggregateInterviewQuestion[P]>
  }




  export type InterviewQuestionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InterviewQuestionWhereInput
    orderBy?: InterviewQuestionOrderByWithAggregationInput | InterviewQuestionOrderByWithAggregationInput[]
    by: InterviewQuestionScalarFieldEnum[] | InterviewQuestionScalarFieldEnum
    having?: InterviewQuestionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: InterviewQuestionCountAggregateInputType | true
    _avg?: InterviewQuestionAvgAggregateInputType
    _sum?: InterviewQuestionSumAggregateInputType
    _min?: InterviewQuestionMinAggregateInputType
    _max?: InterviewQuestionMaxAggregateInputType
  }

  export type InterviewQuestionGroupByOutputType = {
    id: string
    sessionId: string
    questionText: string
    answerText: string | null
    rating: number | null
    confidence: string | null
    feedbackText: string | null
    _count: InterviewQuestionCountAggregateOutputType | null
    _avg: InterviewQuestionAvgAggregateOutputType | null
    _sum: InterviewQuestionSumAggregateOutputType | null
    _min: InterviewQuestionMinAggregateOutputType | null
    _max: InterviewQuestionMaxAggregateOutputType | null
  }

  type GetInterviewQuestionGroupByPayload<T extends InterviewQuestionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<InterviewQuestionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof InterviewQuestionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], InterviewQuestionGroupByOutputType[P]>
            : GetScalarType<T[P], InterviewQuestionGroupByOutputType[P]>
        }
      >
    >


  export type InterviewQuestionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionId?: boolean
    questionText?: boolean
    answerText?: boolean
    rating?: boolean
    confidence?: boolean
    feedbackText?: boolean
    session?: boolean | InterviewSessionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["interviewQuestion"]>

  export type InterviewQuestionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionId?: boolean
    questionText?: boolean
    answerText?: boolean
    rating?: boolean
    confidence?: boolean
    feedbackText?: boolean
    session?: boolean | InterviewSessionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["interviewQuestion"]>

  export type InterviewQuestionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionId?: boolean
    questionText?: boolean
    answerText?: boolean
    rating?: boolean
    confidence?: boolean
    feedbackText?: boolean
    session?: boolean | InterviewSessionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["interviewQuestion"]>

  export type InterviewQuestionSelectScalar = {
    id?: boolean
    sessionId?: boolean
    questionText?: boolean
    answerText?: boolean
    rating?: boolean
    confidence?: boolean
    feedbackText?: boolean
  }

  export type InterviewQuestionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "sessionId" | "questionText" | "answerText" | "rating" | "confidence" | "feedbackText", ExtArgs["result"]["interviewQuestion"]>
  export type InterviewQuestionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    session?: boolean | InterviewSessionDefaultArgs<ExtArgs>
  }
  export type InterviewQuestionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    session?: boolean | InterviewSessionDefaultArgs<ExtArgs>
  }
  export type InterviewQuestionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    session?: boolean | InterviewSessionDefaultArgs<ExtArgs>
  }

  export type $InterviewQuestionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "InterviewQuestion"
    objects: {
      session: Prisma.$InterviewSessionPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      sessionId: string
      questionText: string
      answerText: string | null
      rating: number | null
      confidence: string | null
      feedbackText: string | null
    }, ExtArgs["result"]["interviewQuestion"]>
    composites: {}
  }

  type InterviewQuestionGetPayload<S extends boolean | null | undefined | InterviewQuestionDefaultArgs> = $Result.GetResult<Prisma.$InterviewQuestionPayload, S>

  type InterviewQuestionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<InterviewQuestionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: InterviewQuestionCountAggregateInputType | true
    }

  export interface InterviewQuestionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['InterviewQuestion'], meta: { name: 'InterviewQuestion' } }
    /**
     * Find zero or one InterviewQuestion that matches the filter.
     * @param {InterviewQuestionFindUniqueArgs} args - Arguments to find a InterviewQuestion
     * @example
     * // Get one InterviewQuestion
     * const interviewQuestion = await prisma.interviewQuestion.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends InterviewQuestionFindUniqueArgs>(args: SelectSubset<T, InterviewQuestionFindUniqueArgs<ExtArgs>>): Prisma__InterviewQuestionClient<$Result.GetResult<Prisma.$InterviewQuestionPayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one InterviewQuestion that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {InterviewQuestionFindUniqueOrThrowArgs} args - Arguments to find a InterviewQuestion
     * @example
     * // Get one InterviewQuestion
     * const interviewQuestion = await prisma.interviewQuestion.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends InterviewQuestionFindUniqueOrThrowArgs>(args: SelectSubset<T, InterviewQuestionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__InterviewQuestionClient<$Result.GetResult<Prisma.$InterviewQuestionPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first InterviewQuestion that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InterviewQuestionFindFirstArgs} args - Arguments to find a InterviewQuestion
     * @example
     * // Get one InterviewQuestion
     * const interviewQuestion = await prisma.interviewQuestion.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends InterviewQuestionFindFirstArgs>(args?: SelectSubset<T, InterviewQuestionFindFirstArgs<ExtArgs>>): Prisma__InterviewQuestionClient<$Result.GetResult<Prisma.$InterviewQuestionPayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first InterviewQuestion that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InterviewQuestionFindFirstOrThrowArgs} args - Arguments to find a InterviewQuestion
     * @example
     * // Get one InterviewQuestion
     * const interviewQuestion = await prisma.interviewQuestion.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends InterviewQuestionFindFirstOrThrowArgs>(args?: SelectSubset<T, InterviewQuestionFindFirstOrThrowArgs<ExtArgs>>): Prisma__InterviewQuestionClient<$Result.GetResult<Prisma.$InterviewQuestionPayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more InterviewQuestions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InterviewQuestionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all InterviewQuestions
     * const interviewQuestions = await prisma.interviewQuestion.findMany()
     * 
     * // Get first 10 InterviewQuestions
     * const interviewQuestions = await prisma.interviewQuestion.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const interviewQuestionWithIdOnly = await prisma.interviewQuestion.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends InterviewQuestionFindManyArgs>(args?: SelectSubset<T, InterviewQuestionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InterviewQuestionPayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a InterviewQuestion.
     * @param {InterviewQuestionCreateArgs} args - Arguments to create a InterviewQuestion.
     * @example
     * // Create one InterviewQuestion
     * const InterviewQuestion = await prisma.interviewQuestion.create({
     *   data: {
     *     // ... data to create a InterviewQuestion
     *   }
     * })
     * 
     */
    create<T extends InterviewQuestionCreateArgs>(args: SelectSubset<T, InterviewQuestionCreateArgs<ExtArgs>>): Prisma__InterviewQuestionClient<$Result.GetResult<Prisma.$InterviewQuestionPayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many InterviewQuestions.
     * @param {InterviewQuestionCreateManyArgs} args - Arguments to create many InterviewQuestions.
     * @example
     * // Create many InterviewQuestions
     * const interviewQuestion = await prisma.interviewQuestion.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends InterviewQuestionCreateManyArgs>(args?: SelectSubset<T, InterviewQuestionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many InterviewQuestions and returns the data saved in the database.
     * @param {InterviewQuestionCreateManyAndReturnArgs} args - Arguments to create many InterviewQuestions.
     * @example
     * // Create many InterviewQuestions
     * const interviewQuestion = await prisma.interviewQuestion.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many InterviewQuestions and only return the `id`
     * const interviewQuestionWithIdOnly = await prisma.interviewQuestion.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends InterviewQuestionCreateManyAndReturnArgs>(args?: SelectSubset<T, InterviewQuestionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InterviewQuestionPayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a InterviewQuestion.
     * @param {InterviewQuestionDeleteArgs} args - Arguments to delete one InterviewQuestion.
     * @example
     * // Delete one InterviewQuestion
     * const InterviewQuestion = await prisma.interviewQuestion.delete({
     *   where: {
     *     // ... filter to delete one InterviewQuestion
     *   }
     * })
     * 
     */
    delete<T extends InterviewQuestionDeleteArgs>(args: SelectSubset<T, InterviewQuestionDeleteArgs<ExtArgs>>): Prisma__InterviewQuestionClient<$Result.GetResult<Prisma.$InterviewQuestionPayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one InterviewQuestion.
     * @param {InterviewQuestionUpdateArgs} args - Arguments to update one InterviewQuestion.
     * @example
     * // Update one InterviewQuestion
     * const interviewQuestion = await prisma.interviewQuestion.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends InterviewQuestionUpdateArgs>(args: SelectSubset<T, InterviewQuestionUpdateArgs<ExtArgs>>): Prisma__InterviewQuestionClient<$Result.GetResult<Prisma.$InterviewQuestionPayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more InterviewQuestions.
     * @param {InterviewQuestionDeleteManyArgs} args - Arguments to filter InterviewQuestions to delete.
     * @example
     * // Delete a few InterviewQuestions
     * const { count } = await prisma.interviewQuestion.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends InterviewQuestionDeleteManyArgs>(args?: SelectSubset<T, InterviewQuestionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more InterviewQuestions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InterviewQuestionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many InterviewQuestions
     * const interviewQuestion = await prisma.interviewQuestion.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends InterviewQuestionUpdateManyArgs>(args: SelectSubset<T, InterviewQuestionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more InterviewQuestions and returns the data updated in the database.
     * @param {InterviewQuestionUpdateManyAndReturnArgs} args - Arguments to update many InterviewQuestions.
     * @example
     * // Update many InterviewQuestions
     * const interviewQuestion = await prisma.interviewQuestion.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more InterviewQuestions and only return the `id`
     * const interviewQuestionWithIdOnly = await prisma.interviewQuestion.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends InterviewQuestionUpdateManyAndReturnArgs>(args: SelectSubset<T, InterviewQuestionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InterviewQuestionPayload<ExtArgs>, T, "updateManyAndReturn", ClientOptions>>

    /**
     * Create or update one InterviewQuestion.
     * @param {InterviewQuestionUpsertArgs} args - Arguments to update or create a InterviewQuestion.
     * @example
     * // Update or create a InterviewQuestion
     * const interviewQuestion = await prisma.interviewQuestion.upsert({
     *   create: {
     *     // ... data to create a InterviewQuestion
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the InterviewQuestion we want to update
     *   }
     * })
     */
    upsert<T extends InterviewQuestionUpsertArgs>(args: SelectSubset<T, InterviewQuestionUpsertArgs<ExtArgs>>): Prisma__InterviewQuestionClient<$Result.GetResult<Prisma.$InterviewQuestionPayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of InterviewQuestions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InterviewQuestionCountArgs} args - Arguments to filter InterviewQuestions to count.
     * @example
     * // Count the number of InterviewQuestions
     * const count = await prisma.interviewQuestion.count({
     *   where: {
     *     // ... the filter for the InterviewQuestions we want to count
     *   }
     * })
    **/
    count<T extends InterviewQuestionCountArgs>(
      args?: Subset<T, InterviewQuestionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], InterviewQuestionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a InterviewQuestion.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InterviewQuestionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends InterviewQuestionAggregateArgs>(args: Subset<T, InterviewQuestionAggregateArgs>): Prisma.PrismaPromise<GetInterviewQuestionAggregateType<T>>

    /**
     * Group by InterviewQuestion.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InterviewQuestionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends InterviewQuestionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: InterviewQuestionGroupByArgs['orderBy'] }
        : { orderBy?: InterviewQuestionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, InterviewQuestionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInterviewQuestionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the InterviewQuestion model
   */
  readonly fields: InterviewQuestionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for InterviewQuestion.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__InterviewQuestionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    session<T extends InterviewSessionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, InterviewSessionDefaultArgs<ExtArgs>>): Prisma__InterviewSessionClient<$Result.GetResult<Prisma.$InterviewSessionPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | Null, Null, ExtArgs, ClientOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the InterviewQuestion model
   */ 
  interface InterviewQuestionFieldRefs {
    readonly id: FieldRef<"InterviewQuestion", 'String'>
    readonly sessionId: FieldRef<"InterviewQuestion", 'String'>
    readonly questionText: FieldRef<"InterviewQuestion", 'String'>
    readonly answerText: FieldRef<"InterviewQuestion", 'String'>
    readonly rating: FieldRef<"InterviewQuestion", 'Int'>
    readonly confidence: FieldRef<"InterviewQuestion", 'String'>
    readonly feedbackText: FieldRef<"InterviewQuestion", 'String'>
  }
    

  // Custom InputTypes
  /**
   * InterviewQuestion findUnique
   */
  export type InterviewQuestionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InterviewQuestion
     */
    select?: InterviewQuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InterviewQuestion
     */
    omit?: InterviewQuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InterviewQuestionInclude<ExtArgs> | null
    /**
     * Filter, which InterviewQuestion to fetch.
     */
    where: InterviewQuestionWhereUniqueInput
  }

  /**
   * InterviewQuestion findUniqueOrThrow
   */
  export type InterviewQuestionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InterviewQuestion
     */
    select?: InterviewQuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InterviewQuestion
     */
    omit?: InterviewQuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InterviewQuestionInclude<ExtArgs> | null
    /**
     * Filter, which InterviewQuestion to fetch.
     */
    where: InterviewQuestionWhereUniqueInput
  }

  /**
   * InterviewQuestion findFirst
   */
  export type InterviewQuestionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InterviewQuestion
     */
    select?: InterviewQuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InterviewQuestion
     */
    omit?: InterviewQuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InterviewQuestionInclude<ExtArgs> | null
    /**
     * Filter, which InterviewQuestion to fetch.
     */
    where?: InterviewQuestionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InterviewQuestions to fetch.
     */
    orderBy?: InterviewQuestionOrderByWithRelationInput | InterviewQuestionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for InterviewQuestions.
     */
    cursor?: InterviewQuestionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InterviewQuestions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InterviewQuestions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of InterviewQuestions.
     */
    distinct?: InterviewQuestionScalarFieldEnum | InterviewQuestionScalarFieldEnum[]
  }

  /**
   * InterviewQuestion findFirstOrThrow
   */
  export type InterviewQuestionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InterviewQuestion
     */
    select?: InterviewQuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InterviewQuestion
     */
    omit?: InterviewQuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InterviewQuestionInclude<ExtArgs> | null
    /**
     * Filter, which InterviewQuestion to fetch.
     */
    where?: InterviewQuestionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InterviewQuestions to fetch.
     */
    orderBy?: InterviewQuestionOrderByWithRelationInput | InterviewQuestionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for InterviewQuestions.
     */
    cursor?: InterviewQuestionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InterviewQuestions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InterviewQuestions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of InterviewQuestions.
     */
    distinct?: InterviewQuestionScalarFieldEnum | InterviewQuestionScalarFieldEnum[]
  }

  /**
   * InterviewQuestion findMany
   */
  export type InterviewQuestionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InterviewQuestion
     */
    select?: InterviewQuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InterviewQuestion
     */
    omit?: InterviewQuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InterviewQuestionInclude<ExtArgs> | null
    /**
     * Filter, which InterviewQuestions to fetch.
     */
    where?: InterviewQuestionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InterviewQuestions to fetch.
     */
    orderBy?: InterviewQuestionOrderByWithRelationInput | InterviewQuestionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing InterviewQuestions.
     */
    cursor?: InterviewQuestionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InterviewQuestions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InterviewQuestions.
     */
    skip?: number
    distinct?: InterviewQuestionScalarFieldEnum | InterviewQuestionScalarFieldEnum[]
  }

  /**
   * InterviewQuestion create
   */
  export type InterviewQuestionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InterviewQuestion
     */
    select?: InterviewQuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InterviewQuestion
     */
    omit?: InterviewQuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InterviewQuestionInclude<ExtArgs> | null
    /**
     * The data needed to create a InterviewQuestion.
     */
    data: XOR<InterviewQuestionCreateInput, InterviewQuestionUncheckedCreateInput>
  }

  /**
   * InterviewQuestion createMany
   */
  export type InterviewQuestionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many InterviewQuestions.
     */
    data: InterviewQuestionCreateManyInput | InterviewQuestionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * InterviewQuestion createManyAndReturn
   */
  export type InterviewQuestionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InterviewQuestion
     */
    select?: InterviewQuestionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the InterviewQuestion
     */
    omit?: InterviewQuestionOmit<ExtArgs> | null
    /**
     * The data used to create many InterviewQuestions.
     */
    data: InterviewQuestionCreateManyInput | InterviewQuestionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InterviewQuestionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * InterviewQuestion update
   */
  export type InterviewQuestionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InterviewQuestion
     */
    select?: InterviewQuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InterviewQuestion
     */
    omit?: InterviewQuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InterviewQuestionInclude<ExtArgs> | null
    /**
     * The data needed to update a InterviewQuestion.
     */
    data: XOR<InterviewQuestionUpdateInput, InterviewQuestionUncheckedUpdateInput>
    /**
     * Choose, which InterviewQuestion to update.
     */
    where: InterviewQuestionWhereUniqueInput
  }

  /**
   * InterviewQuestion updateMany
   */
  export type InterviewQuestionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update InterviewQuestions.
     */
    data: XOR<InterviewQuestionUpdateManyMutationInput, InterviewQuestionUncheckedUpdateManyInput>
    /**
     * Filter which InterviewQuestions to update
     */
    where?: InterviewQuestionWhereInput
    /**
     * Limit how many InterviewQuestions to update.
     */
    limit?: number
  }

  /**
   * InterviewQuestion updateManyAndReturn
   */
  export type InterviewQuestionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InterviewQuestion
     */
    select?: InterviewQuestionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the InterviewQuestion
     */
    omit?: InterviewQuestionOmit<ExtArgs> | null
    /**
     * The data used to update InterviewQuestions.
     */
    data: XOR<InterviewQuestionUpdateManyMutationInput, InterviewQuestionUncheckedUpdateManyInput>
    /**
     * Filter which InterviewQuestions to update
     */
    where?: InterviewQuestionWhereInput
    /**
     * Limit how many InterviewQuestions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InterviewQuestionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * InterviewQuestion upsert
   */
  export type InterviewQuestionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InterviewQuestion
     */
    select?: InterviewQuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InterviewQuestion
     */
    omit?: InterviewQuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InterviewQuestionInclude<ExtArgs> | null
    /**
     * The filter to search for the InterviewQuestion to update in case it exists.
     */
    where: InterviewQuestionWhereUniqueInput
    /**
     * In case the InterviewQuestion found by the `where` argument doesn't exist, create a new InterviewQuestion with this data.
     */
    create: XOR<InterviewQuestionCreateInput, InterviewQuestionUncheckedCreateInput>
    /**
     * In case the InterviewQuestion was found with the provided `where` argument, update it with this data.
     */
    update: XOR<InterviewQuestionUpdateInput, InterviewQuestionUncheckedUpdateInput>
  }

  /**
   * InterviewQuestion delete
   */
  export type InterviewQuestionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InterviewQuestion
     */
    select?: InterviewQuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InterviewQuestion
     */
    omit?: InterviewQuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InterviewQuestionInclude<ExtArgs> | null
    /**
     * Filter which InterviewQuestion to delete.
     */
    where: InterviewQuestionWhereUniqueInput
  }

  /**
   * InterviewQuestion deleteMany
   */
  export type InterviewQuestionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which InterviewQuestions to delete
     */
    where?: InterviewQuestionWhereInput
    /**
     * Limit how many InterviewQuestions to delete.
     */
    limit?: number
  }

  /**
   * InterviewQuestion without action
   */
  export type InterviewQuestionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InterviewQuestion
     */
    select?: InterviewQuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InterviewQuestion
     */
    omit?: InterviewQuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InterviewQuestionInclude<ExtArgs> | null
  }


  /**
   * Model ActionItem
   */

  export type AggregateActionItem = {
    _count: ActionItemCountAggregateOutputType | null
    _avg: ActionItemAvgAggregateOutputType | null
    _sum: ActionItemSumAggregateOutputType | null
    _min: ActionItemMinAggregateOutputType | null
    _max: ActionItemMaxAggregateOutputType | null
  }

  export type ActionItemAvgAggregateOutputType = {
    estimatedMinutes: number | null
  }

  export type ActionItemSumAggregateOutputType = {
    estimatedMinutes: number | null
  }

  export type ActionItemMinAggregateOutputType = {
    id: string | null
    userId: string | null
    title: string | null
    description: string | null
    priority: string | null
    status: string | null
    source: string | null
    skillGap: string | null
    estimatedMinutes: number | null
    impactText: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ActionItemMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    title: string | null
    description: string | null
    priority: string | null
    status: string | null
    source: string | null
    skillGap: string | null
    estimatedMinutes: number | null
    impactText: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ActionItemCountAggregateOutputType = {
    id: number
    userId: number
    title: number
    description: number
    priority: number
    status: number
    source: number
    skillGap: number
    estimatedMinutes: number
    impactText: number
    tasks: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ActionItemAvgAggregateInputType = {
    estimatedMinutes?: true
  }

  export type ActionItemSumAggregateInputType = {
    estimatedMinutes?: true
  }

  export type ActionItemMinAggregateInputType = {
    id?: true
    userId?: true
    title?: true
    description?: true
    priority?: true
    status?: true
    source?: true
    skillGap?: true
    estimatedMinutes?: true
    impactText?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ActionItemMaxAggregateInputType = {
    id?: true
    userId?: true
    title?: true
    description?: true
    priority?: true
    status?: true
    source?: true
    skillGap?: true
    estimatedMinutes?: true
    impactText?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ActionItemCountAggregateInputType = {
    id?: true
    userId?: true
    title?: true
    description?: true
    priority?: true
    status?: true
    source?: true
    skillGap?: true
    estimatedMinutes?: true
    impactText?: true
    tasks?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ActionItemAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ActionItem to aggregate.
     */
    where?: ActionItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActionItems to fetch.
     */
    orderBy?: ActionItemOrderByWithRelationInput | ActionItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ActionItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActionItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActionItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ActionItems
    **/
    _count?: true | ActionItemCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ActionItemAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ActionItemSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ActionItemMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ActionItemMaxAggregateInputType
  }

  export type GetActionItemAggregateType<T extends ActionItemAggregateArgs> = {
        [P in keyof T & keyof AggregateActionItem]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateActionItem[P]>
      : GetScalarType<T[P], AggregateActionItem[P]>
  }




  export type ActionItemGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ActionItemWhereInput
    orderBy?: ActionItemOrderByWithAggregationInput | ActionItemOrderByWithAggregationInput[]
    by: ActionItemScalarFieldEnum[] | ActionItemScalarFieldEnum
    having?: ActionItemScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ActionItemCountAggregateInputType | true
    _avg?: ActionItemAvgAggregateInputType
    _sum?: ActionItemSumAggregateInputType
    _min?: ActionItemMinAggregateInputType
    _max?: ActionItemMaxAggregateInputType
  }

  export type ActionItemGroupByOutputType = {
    id: string
    userId: string
    title: string
    description: string
    priority: string
    status: string
    source: string
    skillGap: string | null
    estimatedMinutes: number
    impactText: string | null
    tasks: JsonValue
    createdAt: Date
    updatedAt: Date
    _count: ActionItemCountAggregateOutputType | null
    _avg: ActionItemAvgAggregateOutputType | null
    _sum: ActionItemSumAggregateOutputType | null
    _min: ActionItemMinAggregateOutputType | null
    _max: ActionItemMaxAggregateOutputType | null
  }

  type GetActionItemGroupByPayload<T extends ActionItemGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ActionItemGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ActionItemGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ActionItemGroupByOutputType[P]>
            : GetScalarType<T[P], ActionItemGroupByOutputType[P]>
        }
      >
    >


  export type ActionItemSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    title?: boolean
    description?: boolean
    priority?: boolean
    status?: boolean
    source?: boolean
    skillGap?: boolean
    estimatedMinutes?: boolean
    impactText?: boolean
    tasks?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["actionItem"]>

  export type ActionItemSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    title?: boolean
    description?: boolean
    priority?: boolean
    status?: boolean
    source?: boolean
    skillGap?: boolean
    estimatedMinutes?: boolean
    impactText?: boolean
    tasks?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["actionItem"]>

  export type ActionItemSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    title?: boolean
    description?: boolean
    priority?: boolean
    status?: boolean
    source?: boolean
    skillGap?: boolean
    estimatedMinutes?: boolean
    impactText?: boolean
    tasks?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["actionItem"]>

  export type ActionItemSelectScalar = {
    id?: boolean
    userId?: boolean
    title?: boolean
    description?: boolean
    priority?: boolean
    status?: boolean
    source?: boolean
    skillGap?: boolean
    estimatedMinutes?: boolean
    impactText?: boolean
    tasks?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ActionItemOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "title" | "description" | "priority" | "status" | "source" | "skillGap" | "estimatedMinutes" | "impactText" | "tasks" | "createdAt" | "updatedAt", ExtArgs["result"]["actionItem"]>
  export type ActionItemInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ActionItemIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ActionItemIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ActionItemPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ActionItem"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      title: string
      description: string
      priority: string
      status: string
      source: string
      skillGap: string | null
      estimatedMinutes: number
      impactText: string | null
      tasks: Prisma.JsonValue
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["actionItem"]>
    composites: {}
  }

  type ActionItemGetPayload<S extends boolean | null | undefined | ActionItemDefaultArgs> = $Result.GetResult<Prisma.$ActionItemPayload, S>

  type ActionItemCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ActionItemFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ActionItemCountAggregateInputType | true
    }

  export interface ActionItemDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ActionItem'], meta: { name: 'ActionItem' } }
    /**
     * Find zero or one ActionItem that matches the filter.
     * @param {ActionItemFindUniqueArgs} args - Arguments to find a ActionItem
     * @example
     * // Get one ActionItem
     * const actionItem = await prisma.actionItem.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ActionItemFindUniqueArgs>(args: SelectSubset<T, ActionItemFindUniqueArgs<ExtArgs>>): Prisma__ActionItemClient<$Result.GetResult<Prisma.$ActionItemPayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one ActionItem that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ActionItemFindUniqueOrThrowArgs} args - Arguments to find a ActionItem
     * @example
     * // Get one ActionItem
     * const actionItem = await prisma.actionItem.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ActionItemFindUniqueOrThrowArgs>(args: SelectSubset<T, ActionItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ActionItemClient<$Result.GetResult<Prisma.$ActionItemPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first ActionItem that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActionItemFindFirstArgs} args - Arguments to find a ActionItem
     * @example
     * // Get one ActionItem
     * const actionItem = await prisma.actionItem.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ActionItemFindFirstArgs>(args?: SelectSubset<T, ActionItemFindFirstArgs<ExtArgs>>): Prisma__ActionItemClient<$Result.GetResult<Prisma.$ActionItemPayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first ActionItem that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActionItemFindFirstOrThrowArgs} args - Arguments to find a ActionItem
     * @example
     * // Get one ActionItem
     * const actionItem = await prisma.actionItem.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ActionItemFindFirstOrThrowArgs>(args?: SelectSubset<T, ActionItemFindFirstOrThrowArgs<ExtArgs>>): Prisma__ActionItemClient<$Result.GetResult<Prisma.$ActionItemPayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more ActionItems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActionItemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ActionItems
     * const actionItems = await prisma.actionItem.findMany()
     * 
     * // Get first 10 ActionItems
     * const actionItems = await prisma.actionItem.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const actionItemWithIdOnly = await prisma.actionItem.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ActionItemFindManyArgs>(args?: SelectSubset<T, ActionItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActionItemPayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a ActionItem.
     * @param {ActionItemCreateArgs} args - Arguments to create a ActionItem.
     * @example
     * // Create one ActionItem
     * const ActionItem = await prisma.actionItem.create({
     *   data: {
     *     // ... data to create a ActionItem
     *   }
     * })
     * 
     */
    create<T extends ActionItemCreateArgs>(args: SelectSubset<T, ActionItemCreateArgs<ExtArgs>>): Prisma__ActionItemClient<$Result.GetResult<Prisma.$ActionItemPayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many ActionItems.
     * @param {ActionItemCreateManyArgs} args - Arguments to create many ActionItems.
     * @example
     * // Create many ActionItems
     * const actionItem = await prisma.actionItem.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ActionItemCreateManyArgs>(args?: SelectSubset<T, ActionItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ActionItems and returns the data saved in the database.
     * @param {ActionItemCreateManyAndReturnArgs} args - Arguments to create many ActionItems.
     * @example
     * // Create many ActionItems
     * const actionItem = await prisma.actionItem.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ActionItems and only return the `id`
     * const actionItemWithIdOnly = await prisma.actionItem.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ActionItemCreateManyAndReturnArgs>(args?: SelectSubset<T, ActionItemCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActionItemPayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a ActionItem.
     * @param {ActionItemDeleteArgs} args - Arguments to delete one ActionItem.
     * @example
     * // Delete one ActionItem
     * const ActionItem = await prisma.actionItem.delete({
     *   where: {
     *     // ... filter to delete one ActionItem
     *   }
     * })
     * 
     */
    delete<T extends ActionItemDeleteArgs>(args: SelectSubset<T, ActionItemDeleteArgs<ExtArgs>>): Prisma__ActionItemClient<$Result.GetResult<Prisma.$ActionItemPayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one ActionItem.
     * @param {ActionItemUpdateArgs} args - Arguments to update one ActionItem.
     * @example
     * // Update one ActionItem
     * const actionItem = await prisma.actionItem.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ActionItemUpdateArgs>(args: SelectSubset<T, ActionItemUpdateArgs<ExtArgs>>): Prisma__ActionItemClient<$Result.GetResult<Prisma.$ActionItemPayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more ActionItems.
     * @param {ActionItemDeleteManyArgs} args - Arguments to filter ActionItems to delete.
     * @example
     * // Delete a few ActionItems
     * const { count } = await prisma.actionItem.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ActionItemDeleteManyArgs>(args?: SelectSubset<T, ActionItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ActionItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActionItemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ActionItems
     * const actionItem = await prisma.actionItem.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ActionItemUpdateManyArgs>(args: SelectSubset<T, ActionItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ActionItems and returns the data updated in the database.
     * @param {ActionItemUpdateManyAndReturnArgs} args - Arguments to update many ActionItems.
     * @example
     * // Update many ActionItems
     * const actionItem = await prisma.actionItem.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ActionItems and only return the `id`
     * const actionItemWithIdOnly = await prisma.actionItem.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ActionItemUpdateManyAndReturnArgs>(args: SelectSubset<T, ActionItemUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActionItemPayload<ExtArgs>, T, "updateManyAndReturn", ClientOptions>>

    /**
     * Create or update one ActionItem.
     * @param {ActionItemUpsertArgs} args - Arguments to update or create a ActionItem.
     * @example
     * // Update or create a ActionItem
     * const actionItem = await prisma.actionItem.upsert({
     *   create: {
     *     // ... data to create a ActionItem
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ActionItem we want to update
     *   }
     * })
     */
    upsert<T extends ActionItemUpsertArgs>(args: SelectSubset<T, ActionItemUpsertArgs<ExtArgs>>): Prisma__ActionItemClient<$Result.GetResult<Prisma.$ActionItemPayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of ActionItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActionItemCountArgs} args - Arguments to filter ActionItems to count.
     * @example
     * // Count the number of ActionItems
     * const count = await prisma.actionItem.count({
     *   where: {
     *     // ... the filter for the ActionItems we want to count
     *   }
     * })
    **/
    count<T extends ActionItemCountArgs>(
      args?: Subset<T, ActionItemCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ActionItemCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ActionItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActionItemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ActionItemAggregateArgs>(args: Subset<T, ActionItemAggregateArgs>): Prisma.PrismaPromise<GetActionItemAggregateType<T>>

    /**
     * Group by ActionItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActionItemGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ActionItemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ActionItemGroupByArgs['orderBy'] }
        : { orderBy?: ActionItemGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ActionItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetActionItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ActionItem model
   */
  readonly fields: ActionItemFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ActionItem.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ActionItemClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | Null, Null, ExtArgs, ClientOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ActionItem model
   */ 
  interface ActionItemFieldRefs {
    readonly id: FieldRef<"ActionItem", 'String'>
    readonly userId: FieldRef<"ActionItem", 'String'>
    readonly title: FieldRef<"ActionItem", 'String'>
    readonly description: FieldRef<"ActionItem", 'String'>
    readonly priority: FieldRef<"ActionItem", 'String'>
    readonly status: FieldRef<"ActionItem", 'String'>
    readonly source: FieldRef<"ActionItem", 'String'>
    readonly skillGap: FieldRef<"ActionItem", 'String'>
    readonly estimatedMinutes: FieldRef<"ActionItem", 'Int'>
    readonly impactText: FieldRef<"ActionItem", 'String'>
    readonly tasks: FieldRef<"ActionItem", 'Json'>
    readonly createdAt: FieldRef<"ActionItem", 'DateTime'>
    readonly updatedAt: FieldRef<"ActionItem", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ActionItem findUnique
   */
  export type ActionItemFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActionItem
     */
    select?: ActionItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActionItem
     */
    omit?: ActionItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActionItemInclude<ExtArgs> | null
    /**
     * Filter, which ActionItem to fetch.
     */
    where: ActionItemWhereUniqueInput
  }

  /**
   * ActionItem findUniqueOrThrow
   */
  export type ActionItemFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActionItem
     */
    select?: ActionItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActionItem
     */
    omit?: ActionItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActionItemInclude<ExtArgs> | null
    /**
     * Filter, which ActionItem to fetch.
     */
    where: ActionItemWhereUniqueInput
  }

  /**
   * ActionItem findFirst
   */
  export type ActionItemFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActionItem
     */
    select?: ActionItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActionItem
     */
    omit?: ActionItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActionItemInclude<ExtArgs> | null
    /**
     * Filter, which ActionItem to fetch.
     */
    where?: ActionItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActionItems to fetch.
     */
    orderBy?: ActionItemOrderByWithRelationInput | ActionItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ActionItems.
     */
    cursor?: ActionItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActionItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActionItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ActionItems.
     */
    distinct?: ActionItemScalarFieldEnum | ActionItemScalarFieldEnum[]
  }

  /**
   * ActionItem findFirstOrThrow
   */
  export type ActionItemFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActionItem
     */
    select?: ActionItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActionItem
     */
    omit?: ActionItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActionItemInclude<ExtArgs> | null
    /**
     * Filter, which ActionItem to fetch.
     */
    where?: ActionItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActionItems to fetch.
     */
    orderBy?: ActionItemOrderByWithRelationInput | ActionItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ActionItems.
     */
    cursor?: ActionItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActionItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActionItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ActionItems.
     */
    distinct?: ActionItemScalarFieldEnum | ActionItemScalarFieldEnum[]
  }

  /**
   * ActionItem findMany
   */
  export type ActionItemFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActionItem
     */
    select?: ActionItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActionItem
     */
    omit?: ActionItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActionItemInclude<ExtArgs> | null
    /**
     * Filter, which ActionItems to fetch.
     */
    where?: ActionItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActionItems to fetch.
     */
    orderBy?: ActionItemOrderByWithRelationInput | ActionItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ActionItems.
     */
    cursor?: ActionItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActionItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActionItems.
     */
    skip?: number
    distinct?: ActionItemScalarFieldEnum | ActionItemScalarFieldEnum[]
  }

  /**
   * ActionItem create
   */
  export type ActionItemCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActionItem
     */
    select?: ActionItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActionItem
     */
    omit?: ActionItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActionItemInclude<ExtArgs> | null
    /**
     * The data needed to create a ActionItem.
     */
    data: XOR<ActionItemCreateInput, ActionItemUncheckedCreateInput>
  }

  /**
   * ActionItem createMany
   */
  export type ActionItemCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ActionItems.
     */
    data: ActionItemCreateManyInput | ActionItemCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ActionItem createManyAndReturn
   */
  export type ActionItemCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActionItem
     */
    select?: ActionItemSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ActionItem
     */
    omit?: ActionItemOmit<ExtArgs> | null
    /**
     * The data used to create many ActionItems.
     */
    data: ActionItemCreateManyInput | ActionItemCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActionItemIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ActionItem update
   */
  export type ActionItemUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActionItem
     */
    select?: ActionItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActionItem
     */
    omit?: ActionItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActionItemInclude<ExtArgs> | null
    /**
     * The data needed to update a ActionItem.
     */
    data: XOR<ActionItemUpdateInput, ActionItemUncheckedUpdateInput>
    /**
     * Choose, which ActionItem to update.
     */
    where: ActionItemWhereUniqueInput
  }

  /**
   * ActionItem updateMany
   */
  export type ActionItemUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ActionItems.
     */
    data: XOR<ActionItemUpdateManyMutationInput, ActionItemUncheckedUpdateManyInput>
    /**
     * Filter which ActionItems to update
     */
    where?: ActionItemWhereInput
    /**
     * Limit how many ActionItems to update.
     */
    limit?: number
  }

  /**
   * ActionItem updateManyAndReturn
   */
  export type ActionItemUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActionItem
     */
    select?: ActionItemSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ActionItem
     */
    omit?: ActionItemOmit<ExtArgs> | null
    /**
     * The data used to update ActionItems.
     */
    data: XOR<ActionItemUpdateManyMutationInput, ActionItemUncheckedUpdateManyInput>
    /**
     * Filter which ActionItems to update
     */
    where?: ActionItemWhereInput
    /**
     * Limit how many ActionItems to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActionItemIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ActionItem upsert
   */
  export type ActionItemUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActionItem
     */
    select?: ActionItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActionItem
     */
    omit?: ActionItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActionItemInclude<ExtArgs> | null
    /**
     * The filter to search for the ActionItem to update in case it exists.
     */
    where: ActionItemWhereUniqueInput
    /**
     * In case the ActionItem found by the `where` argument doesn't exist, create a new ActionItem with this data.
     */
    create: XOR<ActionItemCreateInput, ActionItemUncheckedCreateInput>
    /**
     * In case the ActionItem was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ActionItemUpdateInput, ActionItemUncheckedUpdateInput>
  }

  /**
   * ActionItem delete
   */
  export type ActionItemDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActionItem
     */
    select?: ActionItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActionItem
     */
    omit?: ActionItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActionItemInclude<ExtArgs> | null
    /**
     * Filter which ActionItem to delete.
     */
    where: ActionItemWhereUniqueInput
  }

  /**
   * ActionItem deleteMany
   */
  export type ActionItemDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ActionItems to delete
     */
    where?: ActionItemWhereInput
    /**
     * Limit how many ActionItems to delete.
     */
    limit?: number
  }

  /**
   * ActionItem without action
   */
  export type ActionItemDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActionItem
     */
    select?: ActionItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActionItem
     */
    omit?: ActionItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActionItemInclude<ExtArgs> | null
  }


  /**
   * Model ProjectRecommendation
   */

  export type AggregateProjectRecommendation = {
    _count: ProjectRecommendationCountAggregateOutputType | null
    _min: ProjectRecommendationMinAggregateOutputType | null
    _max: ProjectRecommendationMaxAggregateOutputType | null
  }

  export type ProjectRecommendationMinAggregateOutputType = {
    id: string | null
    userId: string | null
    title: string | null
    description: string | null
    difficulty: string | null
    resumeValue: string | null
    sourceGap: string | null
    status: string | null
    createdAt: Date | null
  }

  export type ProjectRecommendationMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    title: string | null
    description: string | null
    difficulty: string | null
    resumeValue: string | null
    sourceGap: string | null
    status: string | null
    createdAt: Date | null
  }

  export type ProjectRecommendationCountAggregateOutputType = {
    id: number
    userId: number
    title: number
    description: number
    techStack: number
    difficulty: number
    resumeValue: number
    deliverables: number
    interviewPrep: number
    sourceGap: number
    status: number
    createdAt: number
    _all: number
  }


  export type ProjectRecommendationMinAggregateInputType = {
    id?: true
    userId?: true
    title?: true
    description?: true
    difficulty?: true
    resumeValue?: true
    sourceGap?: true
    status?: true
    createdAt?: true
  }

  export type ProjectRecommendationMaxAggregateInputType = {
    id?: true
    userId?: true
    title?: true
    description?: true
    difficulty?: true
    resumeValue?: true
    sourceGap?: true
    status?: true
    createdAt?: true
  }

  export type ProjectRecommendationCountAggregateInputType = {
    id?: true
    userId?: true
    title?: true
    description?: true
    techStack?: true
    difficulty?: true
    resumeValue?: true
    deliverables?: true
    interviewPrep?: true
    sourceGap?: true
    status?: true
    createdAt?: true
    _all?: true
  }

  export type ProjectRecommendationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProjectRecommendation to aggregate.
     */
    where?: ProjectRecommendationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProjectRecommendations to fetch.
     */
    orderBy?: ProjectRecommendationOrderByWithRelationInput | ProjectRecommendationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProjectRecommendationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProjectRecommendations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProjectRecommendations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ProjectRecommendations
    **/
    _count?: true | ProjectRecommendationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProjectRecommendationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProjectRecommendationMaxAggregateInputType
  }

  export type GetProjectRecommendationAggregateType<T extends ProjectRecommendationAggregateArgs> = {
        [P in keyof T & keyof AggregateProjectRecommendation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProjectRecommendation[P]>
      : GetScalarType<T[P], AggregateProjectRecommendation[P]>
  }




  export type ProjectRecommendationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectRecommendationWhereInput
    orderBy?: ProjectRecommendationOrderByWithAggregationInput | ProjectRecommendationOrderByWithAggregationInput[]
    by: ProjectRecommendationScalarFieldEnum[] | ProjectRecommendationScalarFieldEnum
    having?: ProjectRecommendationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProjectRecommendationCountAggregateInputType | true
    _min?: ProjectRecommendationMinAggregateInputType
    _max?: ProjectRecommendationMaxAggregateInputType
  }

  export type ProjectRecommendationGroupByOutputType = {
    id: string
    userId: string
    title: string
    description: string
    techStack: string[]
    difficulty: string
    resumeValue: string
    deliverables: string[]
    interviewPrep: string[]
    sourceGap: string
    status: string
    createdAt: Date
    _count: ProjectRecommendationCountAggregateOutputType | null
    _min: ProjectRecommendationMinAggregateOutputType | null
    _max: ProjectRecommendationMaxAggregateOutputType | null
  }

  type GetProjectRecommendationGroupByPayload<T extends ProjectRecommendationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProjectRecommendationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProjectRecommendationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProjectRecommendationGroupByOutputType[P]>
            : GetScalarType<T[P], ProjectRecommendationGroupByOutputType[P]>
        }
      >
    >


  export type ProjectRecommendationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    title?: boolean
    description?: boolean
    techStack?: boolean
    difficulty?: boolean
    resumeValue?: boolean
    deliverables?: boolean
    interviewPrep?: boolean
    sourceGap?: boolean
    status?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["projectRecommendation"]>

  export type ProjectRecommendationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    title?: boolean
    description?: boolean
    techStack?: boolean
    difficulty?: boolean
    resumeValue?: boolean
    deliverables?: boolean
    interviewPrep?: boolean
    sourceGap?: boolean
    status?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["projectRecommendation"]>

  export type ProjectRecommendationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    title?: boolean
    description?: boolean
    techStack?: boolean
    difficulty?: boolean
    resumeValue?: boolean
    deliverables?: boolean
    interviewPrep?: boolean
    sourceGap?: boolean
    status?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["projectRecommendation"]>

  export type ProjectRecommendationSelectScalar = {
    id?: boolean
    userId?: boolean
    title?: boolean
    description?: boolean
    techStack?: boolean
    difficulty?: boolean
    resumeValue?: boolean
    deliverables?: boolean
    interviewPrep?: boolean
    sourceGap?: boolean
    status?: boolean
    createdAt?: boolean
  }

  export type ProjectRecommendationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "title" | "description" | "techStack" | "difficulty" | "resumeValue" | "deliverables" | "interviewPrep" | "sourceGap" | "status" | "createdAt", ExtArgs["result"]["projectRecommendation"]>
  export type ProjectRecommendationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ProjectRecommendationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ProjectRecommendationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ProjectRecommendationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ProjectRecommendation"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      title: string
      description: string
      techStack: string[]
      difficulty: string
      resumeValue: string
      deliverables: string[]
      interviewPrep: string[]
      sourceGap: string
      status: string
      createdAt: Date
    }, ExtArgs["result"]["projectRecommendation"]>
    composites: {}
  }

  type ProjectRecommendationGetPayload<S extends boolean | null | undefined | ProjectRecommendationDefaultArgs> = $Result.GetResult<Prisma.$ProjectRecommendationPayload, S>

  type ProjectRecommendationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProjectRecommendationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProjectRecommendationCountAggregateInputType | true
    }

  export interface ProjectRecommendationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ProjectRecommendation'], meta: { name: 'ProjectRecommendation' } }
    /**
     * Find zero or one ProjectRecommendation that matches the filter.
     * @param {ProjectRecommendationFindUniqueArgs} args - Arguments to find a ProjectRecommendation
     * @example
     * // Get one ProjectRecommendation
     * const projectRecommendation = await prisma.projectRecommendation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProjectRecommendationFindUniqueArgs>(args: SelectSubset<T, ProjectRecommendationFindUniqueArgs<ExtArgs>>): Prisma__ProjectRecommendationClient<$Result.GetResult<Prisma.$ProjectRecommendationPayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one ProjectRecommendation that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProjectRecommendationFindUniqueOrThrowArgs} args - Arguments to find a ProjectRecommendation
     * @example
     * // Get one ProjectRecommendation
     * const projectRecommendation = await prisma.projectRecommendation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProjectRecommendationFindUniqueOrThrowArgs>(args: SelectSubset<T, ProjectRecommendationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProjectRecommendationClient<$Result.GetResult<Prisma.$ProjectRecommendationPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first ProjectRecommendation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectRecommendationFindFirstArgs} args - Arguments to find a ProjectRecommendation
     * @example
     * // Get one ProjectRecommendation
     * const projectRecommendation = await prisma.projectRecommendation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProjectRecommendationFindFirstArgs>(args?: SelectSubset<T, ProjectRecommendationFindFirstArgs<ExtArgs>>): Prisma__ProjectRecommendationClient<$Result.GetResult<Prisma.$ProjectRecommendationPayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first ProjectRecommendation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectRecommendationFindFirstOrThrowArgs} args - Arguments to find a ProjectRecommendation
     * @example
     * // Get one ProjectRecommendation
     * const projectRecommendation = await prisma.projectRecommendation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProjectRecommendationFindFirstOrThrowArgs>(args?: SelectSubset<T, ProjectRecommendationFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProjectRecommendationClient<$Result.GetResult<Prisma.$ProjectRecommendationPayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more ProjectRecommendations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectRecommendationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProjectRecommendations
     * const projectRecommendations = await prisma.projectRecommendation.findMany()
     * 
     * // Get first 10 ProjectRecommendations
     * const projectRecommendations = await prisma.projectRecommendation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const projectRecommendationWithIdOnly = await prisma.projectRecommendation.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProjectRecommendationFindManyArgs>(args?: SelectSubset<T, ProjectRecommendationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectRecommendationPayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a ProjectRecommendation.
     * @param {ProjectRecommendationCreateArgs} args - Arguments to create a ProjectRecommendation.
     * @example
     * // Create one ProjectRecommendation
     * const ProjectRecommendation = await prisma.projectRecommendation.create({
     *   data: {
     *     // ... data to create a ProjectRecommendation
     *   }
     * })
     * 
     */
    create<T extends ProjectRecommendationCreateArgs>(args: SelectSubset<T, ProjectRecommendationCreateArgs<ExtArgs>>): Prisma__ProjectRecommendationClient<$Result.GetResult<Prisma.$ProjectRecommendationPayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many ProjectRecommendations.
     * @param {ProjectRecommendationCreateManyArgs} args - Arguments to create many ProjectRecommendations.
     * @example
     * // Create many ProjectRecommendations
     * const projectRecommendation = await prisma.projectRecommendation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProjectRecommendationCreateManyArgs>(args?: SelectSubset<T, ProjectRecommendationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ProjectRecommendations and returns the data saved in the database.
     * @param {ProjectRecommendationCreateManyAndReturnArgs} args - Arguments to create many ProjectRecommendations.
     * @example
     * // Create many ProjectRecommendations
     * const projectRecommendation = await prisma.projectRecommendation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ProjectRecommendations and only return the `id`
     * const projectRecommendationWithIdOnly = await prisma.projectRecommendation.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProjectRecommendationCreateManyAndReturnArgs>(args?: SelectSubset<T, ProjectRecommendationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectRecommendationPayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a ProjectRecommendation.
     * @param {ProjectRecommendationDeleteArgs} args - Arguments to delete one ProjectRecommendation.
     * @example
     * // Delete one ProjectRecommendation
     * const ProjectRecommendation = await prisma.projectRecommendation.delete({
     *   where: {
     *     // ... filter to delete one ProjectRecommendation
     *   }
     * })
     * 
     */
    delete<T extends ProjectRecommendationDeleteArgs>(args: SelectSubset<T, ProjectRecommendationDeleteArgs<ExtArgs>>): Prisma__ProjectRecommendationClient<$Result.GetResult<Prisma.$ProjectRecommendationPayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one ProjectRecommendation.
     * @param {ProjectRecommendationUpdateArgs} args - Arguments to update one ProjectRecommendation.
     * @example
     * // Update one ProjectRecommendation
     * const projectRecommendation = await prisma.projectRecommendation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProjectRecommendationUpdateArgs>(args: SelectSubset<T, ProjectRecommendationUpdateArgs<ExtArgs>>): Prisma__ProjectRecommendationClient<$Result.GetResult<Prisma.$ProjectRecommendationPayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more ProjectRecommendations.
     * @param {ProjectRecommendationDeleteManyArgs} args - Arguments to filter ProjectRecommendations to delete.
     * @example
     * // Delete a few ProjectRecommendations
     * const { count } = await prisma.projectRecommendation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProjectRecommendationDeleteManyArgs>(args?: SelectSubset<T, ProjectRecommendationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProjectRecommendations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectRecommendationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProjectRecommendations
     * const projectRecommendation = await prisma.projectRecommendation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProjectRecommendationUpdateManyArgs>(args: SelectSubset<T, ProjectRecommendationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProjectRecommendations and returns the data updated in the database.
     * @param {ProjectRecommendationUpdateManyAndReturnArgs} args - Arguments to update many ProjectRecommendations.
     * @example
     * // Update many ProjectRecommendations
     * const projectRecommendation = await prisma.projectRecommendation.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ProjectRecommendations and only return the `id`
     * const projectRecommendationWithIdOnly = await prisma.projectRecommendation.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProjectRecommendationUpdateManyAndReturnArgs>(args: SelectSubset<T, ProjectRecommendationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectRecommendationPayload<ExtArgs>, T, "updateManyAndReturn", ClientOptions>>

    /**
     * Create or update one ProjectRecommendation.
     * @param {ProjectRecommendationUpsertArgs} args - Arguments to update or create a ProjectRecommendation.
     * @example
     * // Update or create a ProjectRecommendation
     * const projectRecommendation = await prisma.projectRecommendation.upsert({
     *   create: {
     *     // ... data to create a ProjectRecommendation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProjectRecommendation we want to update
     *   }
     * })
     */
    upsert<T extends ProjectRecommendationUpsertArgs>(args: SelectSubset<T, ProjectRecommendationUpsertArgs<ExtArgs>>): Prisma__ProjectRecommendationClient<$Result.GetResult<Prisma.$ProjectRecommendationPayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of ProjectRecommendations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectRecommendationCountArgs} args - Arguments to filter ProjectRecommendations to count.
     * @example
     * // Count the number of ProjectRecommendations
     * const count = await prisma.projectRecommendation.count({
     *   where: {
     *     // ... the filter for the ProjectRecommendations we want to count
     *   }
     * })
    **/
    count<T extends ProjectRecommendationCountArgs>(
      args?: Subset<T, ProjectRecommendationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProjectRecommendationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ProjectRecommendation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectRecommendationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProjectRecommendationAggregateArgs>(args: Subset<T, ProjectRecommendationAggregateArgs>): Prisma.PrismaPromise<GetProjectRecommendationAggregateType<T>>

    /**
     * Group by ProjectRecommendation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectRecommendationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProjectRecommendationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProjectRecommendationGroupByArgs['orderBy'] }
        : { orderBy?: ProjectRecommendationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProjectRecommendationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProjectRecommendationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ProjectRecommendation model
   */
  readonly fields: ProjectRecommendationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ProjectRecommendation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProjectRecommendationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | Null, Null, ExtArgs, ClientOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ProjectRecommendation model
   */ 
  interface ProjectRecommendationFieldRefs {
    readonly id: FieldRef<"ProjectRecommendation", 'String'>
    readonly userId: FieldRef<"ProjectRecommendation", 'String'>
    readonly title: FieldRef<"ProjectRecommendation", 'String'>
    readonly description: FieldRef<"ProjectRecommendation", 'String'>
    readonly techStack: FieldRef<"ProjectRecommendation", 'String[]'>
    readonly difficulty: FieldRef<"ProjectRecommendation", 'String'>
    readonly resumeValue: FieldRef<"ProjectRecommendation", 'String'>
    readonly deliverables: FieldRef<"ProjectRecommendation", 'String[]'>
    readonly interviewPrep: FieldRef<"ProjectRecommendation", 'String[]'>
    readonly sourceGap: FieldRef<"ProjectRecommendation", 'String'>
    readonly status: FieldRef<"ProjectRecommendation", 'String'>
    readonly createdAt: FieldRef<"ProjectRecommendation", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ProjectRecommendation findUnique
   */
  export type ProjectRecommendationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectRecommendation
     */
    select?: ProjectRecommendationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectRecommendation
     */
    omit?: ProjectRecommendationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectRecommendationInclude<ExtArgs> | null
    /**
     * Filter, which ProjectRecommendation to fetch.
     */
    where: ProjectRecommendationWhereUniqueInput
  }

  /**
   * ProjectRecommendation findUniqueOrThrow
   */
  export type ProjectRecommendationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectRecommendation
     */
    select?: ProjectRecommendationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectRecommendation
     */
    omit?: ProjectRecommendationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectRecommendationInclude<ExtArgs> | null
    /**
     * Filter, which ProjectRecommendation to fetch.
     */
    where: ProjectRecommendationWhereUniqueInput
  }

  /**
   * ProjectRecommendation findFirst
   */
  export type ProjectRecommendationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectRecommendation
     */
    select?: ProjectRecommendationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectRecommendation
     */
    omit?: ProjectRecommendationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectRecommendationInclude<ExtArgs> | null
    /**
     * Filter, which ProjectRecommendation to fetch.
     */
    where?: ProjectRecommendationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProjectRecommendations to fetch.
     */
    orderBy?: ProjectRecommendationOrderByWithRelationInput | ProjectRecommendationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProjectRecommendations.
     */
    cursor?: ProjectRecommendationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProjectRecommendations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProjectRecommendations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProjectRecommendations.
     */
    distinct?: ProjectRecommendationScalarFieldEnum | ProjectRecommendationScalarFieldEnum[]
  }

  /**
   * ProjectRecommendation findFirstOrThrow
   */
  export type ProjectRecommendationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectRecommendation
     */
    select?: ProjectRecommendationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectRecommendation
     */
    omit?: ProjectRecommendationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectRecommendationInclude<ExtArgs> | null
    /**
     * Filter, which ProjectRecommendation to fetch.
     */
    where?: ProjectRecommendationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProjectRecommendations to fetch.
     */
    orderBy?: ProjectRecommendationOrderByWithRelationInput | ProjectRecommendationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProjectRecommendations.
     */
    cursor?: ProjectRecommendationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProjectRecommendations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProjectRecommendations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProjectRecommendations.
     */
    distinct?: ProjectRecommendationScalarFieldEnum | ProjectRecommendationScalarFieldEnum[]
  }

  /**
   * ProjectRecommendation findMany
   */
  export type ProjectRecommendationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectRecommendation
     */
    select?: ProjectRecommendationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectRecommendation
     */
    omit?: ProjectRecommendationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectRecommendationInclude<ExtArgs> | null
    /**
     * Filter, which ProjectRecommendations to fetch.
     */
    where?: ProjectRecommendationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProjectRecommendations to fetch.
     */
    orderBy?: ProjectRecommendationOrderByWithRelationInput | ProjectRecommendationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ProjectRecommendations.
     */
    cursor?: ProjectRecommendationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProjectRecommendations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProjectRecommendations.
     */
    skip?: number
    distinct?: ProjectRecommendationScalarFieldEnum | ProjectRecommendationScalarFieldEnum[]
  }

  /**
   * ProjectRecommendation create
   */
  export type ProjectRecommendationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectRecommendation
     */
    select?: ProjectRecommendationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectRecommendation
     */
    omit?: ProjectRecommendationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectRecommendationInclude<ExtArgs> | null
    /**
     * The data needed to create a ProjectRecommendation.
     */
    data: XOR<ProjectRecommendationCreateInput, ProjectRecommendationUncheckedCreateInput>
  }

  /**
   * ProjectRecommendation createMany
   */
  export type ProjectRecommendationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ProjectRecommendations.
     */
    data: ProjectRecommendationCreateManyInput | ProjectRecommendationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ProjectRecommendation createManyAndReturn
   */
  export type ProjectRecommendationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectRecommendation
     */
    select?: ProjectRecommendationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectRecommendation
     */
    omit?: ProjectRecommendationOmit<ExtArgs> | null
    /**
     * The data used to create many ProjectRecommendations.
     */
    data: ProjectRecommendationCreateManyInput | ProjectRecommendationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectRecommendationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProjectRecommendation update
   */
  export type ProjectRecommendationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectRecommendation
     */
    select?: ProjectRecommendationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectRecommendation
     */
    omit?: ProjectRecommendationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectRecommendationInclude<ExtArgs> | null
    /**
     * The data needed to update a ProjectRecommendation.
     */
    data: XOR<ProjectRecommendationUpdateInput, ProjectRecommendationUncheckedUpdateInput>
    /**
     * Choose, which ProjectRecommendation to update.
     */
    where: ProjectRecommendationWhereUniqueInput
  }

  /**
   * ProjectRecommendation updateMany
   */
  export type ProjectRecommendationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ProjectRecommendations.
     */
    data: XOR<ProjectRecommendationUpdateManyMutationInput, ProjectRecommendationUncheckedUpdateManyInput>
    /**
     * Filter which ProjectRecommendations to update
     */
    where?: ProjectRecommendationWhereInput
    /**
     * Limit how many ProjectRecommendations to update.
     */
    limit?: number
  }

  /**
   * ProjectRecommendation updateManyAndReturn
   */
  export type ProjectRecommendationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectRecommendation
     */
    select?: ProjectRecommendationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectRecommendation
     */
    omit?: ProjectRecommendationOmit<ExtArgs> | null
    /**
     * The data used to update ProjectRecommendations.
     */
    data: XOR<ProjectRecommendationUpdateManyMutationInput, ProjectRecommendationUncheckedUpdateManyInput>
    /**
     * Filter which ProjectRecommendations to update
     */
    where?: ProjectRecommendationWhereInput
    /**
     * Limit how many ProjectRecommendations to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectRecommendationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProjectRecommendation upsert
   */
  export type ProjectRecommendationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectRecommendation
     */
    select?: ProjectRecommendationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectRecommendation
     */
    omit?: ProjectRecommendationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectRecommendationInclude<ExtArgs> | null
    /**
     * The filter to search for the ProjectRecommendation to update in case it exists.
     */
    where: ProjectRecommendationWhereUniqueInput
    /**
     * In case the ProjectRecommendation found by the `where` argument doesn't exist, create a new ProjectRecommendation with this data.
     */
    create: XOR<ProjectRecommendationCreateInput, ProjectRecommendationUncheckedCreateInput>
    /**
     * In case the ProjectRecommendation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProjectRecommendationUpdateInput, ProjectRecommendationUncheckedUpdateInput>
  }

  /**
   * ProjectRecommendation delete
   */
  export type ProjectRecommendationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectRecommendation
     */
    select?: ProjectRecommendationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectRecommendation
     */
    omit?: ProjectRecommendationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectRecommendationInclude<ExtArgs> | null
    /**
     * Filter which ProjectRecommendation to delete.
     */
    where: ProjectRecommendationWhereUniqueInput
  }

  /**
   * ProjectRecommendation deleteMany
   */
  export type ProjectRecommendationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProjectRecommendations to delete
     */
    where?: ProjectRecommendationWhereInput
    /**
     * Limit how many ProjectRecommendations to delete.
     */
    limit?: number
  }

  /**
   * ProjectRecommendation without action
   */
  export type ProjectRecommendationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectRecommendation
     */
    select?: ProjectRecommendationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectRecommendation
     */
    omit?: ProjectRecommendationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectRecommendationInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    passwordHash: 'passwordHash',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const ProfileScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    fullName: 'fullName',
    targetRole: 'targetRole',
    targetLevel: 'targetLevel',
    streakDays: 'streakDays',
    dailyScore: 'dailyScore',
    easySolved: 'easySolved',
    mediumSolved: 'mediumSolved',
    hardSolved: 'hardSolved',
    targetCompany: 'targetCompany',
    companyType: 'companyType',
    specialization: 'specialization',
    experienceLevel: 'experienceLevel',
    targetTimeline: 'targetTimeline',
    timeAvailable: 'timeAvailable',
    currentSkills: 'currentSkills',
    onboardingCompleted: 'onboardingCompleted',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ProfileScalarFieldEnum = (typeof ProfileScalarFieldEnum)[keyof typeof ProfileScalarFieldEnum]


  export const ResumeScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    title: 'title',
    createdAt: 'createdAt'
  };

  export type ResumeScalarFieldEnum = (typeof ResumeScalarFieldEnum)[keyof typeof ResumeScalarFieldEnum]


  export const ResumeVersionScalarFieldEnum: {
    id: 'id',
    resumeId: 'resumeId',
    fileUrl: 'fileUrl',
    extractedText: 'extractedText',
    versionNo: 'versionNo',
    createdAt: 'createdAt'
  };

  export type ResumeVersionScalarFieldEnum = (typeof ResumeVersionScalarFieldEnum)[keyof typeof ResumeVersionScalarFieldEnum]


  export const ResumeAnalysisScalarFieldEnum: {
    id: 'id',
    resumeVersionId: 'resumeVersionId',
    atsScore: 'atsScore',
    compatibilityText: 'compatibilityText',
    suggestions: 'suggestions',
    missingKeywords: 'missingKeywords',
    createdAt: 'createdAt'
  };

  export type ResumeAnalysisScalarFieldEnum = (typeof ResumeAnalysisScalarFieldEnum)[keyof typeof ResumeAnalysisScalarFieldEnum]


  export const ApplicationScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    title: 'title',
    company: 'company',
    status: 'status',
    priorityFlag: 'priorityFlag',
    location: 'location',
    appliedDate: 'appliedDate',
    createdAt: 'createdAt'
  };

  export type ApplicationScalarFieldEnum = (typeof ApplicationScalarFieldEnum)[keyof typeof ApplicationScalarFieldEnum]


  export const CareerRoadmapScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    title: 'title',
    duration: 'duration',
    skillLevel: 'skillLevel',
    createdAt: 'createdAt',
    checkedTasks: 'checkedTasks'
  };

  export type CareerRoadmapScalarFieldEnum = (typeof CareerRoadmapScalarFieldEnum)[keyof typeof CareerRoadmapScalarFieldEnum]


  export const RoadmapMilestoneScalarFieldEnum: {
    id: 'id',
    roadmapId: 'roadmapId',
    monthNo: 'monthNo',
    title: 'title',
    weeksData: 'weeksData'
  };

  export type RoadmapMilestoneScalarFieldEnum = (typeof RoadmapMilestoneScalarFieldEnum)[keyof typeof RoadmapMilestoneScalarFieldEnum]


  export const InterviewSessionScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    roleContext: 'roleContext',
    overallScore: 'overallScore',
    readinessLevel: 'readinessLevel',
    strengths: 'strengths',
    improvements: 'improvements',
    createdAt: 'createdAt'
  };

  export type InterviewSessionScalarFieldEnum = (typeof InterviewSessionScalarFieldEnum)[keyof typeof InterviewSessionScalarFieldEnum]


  export const InterviewQuestionScalarFieldEnum: {
    id: 'id',
    sessionId: 'sessionId',
    questionText: 'questionText',
    answerText: 'answerText',
    rating: 'rating',
    confidence: 'confidence',
    feedbackText: 'feedbackText'
  };

  export type InterviewQuestionScalarFieldEnum = (typeof InterviewQuestionScalarFieldEnum)[keyof typeof InterviewQuestionScalarFieldEnum]


  export const ActionItemScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    title: 'title',
    description: 'description',
    priority: 'priority',
    status: 'status',
    source: 'source',
    skillGap: 'skillGap',
    estimatedMinutes: 'estimatedMinutes',
    impactText: 'impactText',
    tasks: 'tasks',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ActionItemScalarFieldEnum = (typeof ActionItemScalarFieldEnum)[keyof typeof ActionItemScalarFieldEnum]


  export const ProjectRecommendationScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    title: 'title',
    description: 'description',
    techStack: 'techStack',
    difficulty: 'difficulty',
    resumeValue: 'resumeValue',
    deliverables: 'deliverables',
    interviewPrep: 'interviewPrep',
    sourceGap: 'sourceGap',
    status: 'status',
    createdAt: 'createdAt'
  };

  export type ProjectRecommendationScalarFieldEnum = (typeof ProjectRecommendationScalarFieldEnum)[keyof typeof ProjectRecommendationScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    passwordHash?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    profile?: XOR<ProfileNullableScalarRelationFilter, ProfileWhereInput> | null
    resumes?: ResumeListRelationFilter
    applications?: ApplicationListRelationFilter
    roadmaps?: CareerRoadmapListRelationFilter
    interviewSessions?: InterviewSessionListRelationFilter
    actionItems?: ActionItemListRelationFilter
    projects?: ProjectRecommendationListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    profile?: ProfileOrderByWithRelationInput
    resumes?: ResumeOrderByRelationAggregateInput
    applications?: ApplicationOrderByRelationAggregateInput
    roadmaps?: CareerRoadmapOrderByRelationAggregateInput
    interviewSessions?: InterviewSessionOrderByRelationAggregateInput
    actionItems?: ActionItemOrderByRelationAggregateInput
    projects?: ProjectRecommendationOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    passwordHash?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    profile?: XOR<ProfileNullableScalarRelationFilter, ProfileWhereInput> | null
    resumes?: ResumeListRelationFilter
    applications?: ApplicationListRelationFilter
    roadmaps?: CareerRoadmapListRelationFilter
    interviewSessions?: InterviewSessionListRelationFilter
    actionItems?: ActionItemListRelationFilter
    projects?: ProjectRecommendationListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    passwordHash?: StringWithAggregatesFilter<"User"> | string
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type ProfileWhereInput = {
    AND?: ProfileWhereInput | ProfileWhereInput[]
    OR?: ProfileWhereInput[]
    NOT?: ProfileWhereInput | ProfileWhereInput[]
    id?: StringFilter<"Profile"> | string
    userId?: StringFilter<"Profile"> | string
    fullName?: StringFilter<"Profile"> | string
    targetRole?: StringNullableFilter<"Profile"> | string | null
    targetLevel?: StringNullableFilter<"Profile"> | string | null
    streakDays?: IntFilter<"Profile"> | number
    dailyScore?: IntFilter<"Profile"> | number
    easySolved?: IntFilter<"Profile"> | number
    mediumSolved?: IntFilter<"Profile"> | number
    hardSolved?: IntFilter<"Profile"> | number
    targetCompany?: StringNullableFilter<"Profile"> | string | null
    companyType?: StringNullableFilter<"Profile"> | string | null
    specialization?: StringNullableFilter<"Profile"> | string | null
    experienceLevel?: StringNullableFilter<"Profile"> | string | null
    targetTimeline?: IntFilter<"Profile"> | number
    timeAvailable?: StringNullableFilter<"Profile"> | string | null
    currentSkills?: JsonFilter<"Profile">
    onboardingCompleted?: BoolFilter<"Profile"> | boolean
    createdAt?: DateTimeFilter<"Profile"> | Date | string
    updatedAt?: DateTimeFilter<"Profile"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type ProfileOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    fullName?: SortOrder
    targetRole?: SortOrderInput | SortOrder
    targetLevel?: SortOrderInput | SortOrder
    streakDays?: SortOrder
    dailyScore?: SortOrder
    easySolved?: SortOrder
    mediumSolved?: SortOrder
    hardSolved?: SortOrder
    targetCompany?: SortOrderInput | SortOrder
    companyType?: SortOrderInput | SortOrder
    specialization?: SortOrderInput | SortOrder
    experienceLevel?: SortOrderInput | SortOrder
    targetTimeline?: SortOrder
    timeAvailable?: SortOrderInput | SortOrder
    currentSkills?: SortOrder
    onboardingCompleted?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type ProfileWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    AND?: ProfileWhereInput | ProfileWhereInput[]
    OR?: ProfileWhereInput[]
    NOT?: ProfileWhereInput | ProfileWhereInput[]
    fullName?: StringFilter<"Profile"> | string
    targetRole?: StringNullableFilter<"Profile"> | string | null
    targetLevel?: StringNullableFilter<"Profile"> | string | null
    streakDays?: IntFilter<"Profile"> | number
    dailyScore?: IntFilter<"Profile"> | number
    easySolved?: IntFilter<"Profile"> | number
    mediumSolved?: IntFilter<"Profile"> | number
    hardSolved?: IntFilter<"Profile"> | number
    targetCompany?: StringNullableFilter<"Profile"> | string | null
    companyType?: StringNullableFilter<"Profile"> | string | null
    specialization?: StringNullableFilter<"Profile"> | string | null
    experienceLevel?: StringNullableFilter<"Profile"> | string | null
    targetTimeline?: IntFilter<"Profile"> | number
    timeAvailable?: StringNullableFilter<"Profile"> | string | null
    currentSkills?: JsonFilter<"Profile">
    onboardingCompleted?: BoolFilter<"Profile"> | boolean
    createdAt?: DateTimeFilter<"Profile"> | Date | string
    updatedAt?: DateTimeFilter<"Profile"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "userId">

  export type ProfileOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    fullName?: SortOrder
    targetRole?: SortOrderInput | SortOrder
    targetLevel?: SortOrderInput | SortOrder
    streakDays?: SortOrder
    dailyScore?: SortOrder
    easySolved?: SortOrder
    mediumSolved?: SortOrder
    hardSolved?: SortOrder
    targetCompany?: SortOrderInput | SortOrder
    companyType?: SortOrderInput | SortOrder
    specialization?: SortOrderInput | SortOrder
    experienceLevel?: SortOrderInput | SortOrder
    targetTimeline?: SortOrder
    timeAvailable?: SortOrderInput | SortOrder
    currentSkills?: SortOrder
    onboardingCompleted?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ProfileCountOrderByAggregateInput
    _avg?: ProfileAvgOrderByAggregateInput
    _max?: ProfileMaxOrderByAggregateInput
    _min?: ProfileMinOrderByAggregateInput
    _sum?: ProfileSumOrderByAggregateInput
  }

  export type ProfileScalarWhereWithAggregatesInput = {
    AND?: ProfileScalarWhereWithAggregatesInput | ProfileScalarWhereWithAggregatesInput[]
    OR?: ProfileScalarWhereWithAggregatesInput[]
    NOT?: ProfileScalarWhereWithAggregatesInput | ProfileScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Profile"> | string
    userId?: StringWithAggregatesFilter<"Profile"> | string
    fullName?: StringWithAggregatesFilter<"Profile"> | string
    targetRole?: StringNullableWithAggregatesFilter<"Profile"> | string | null
    targetLevel?: StringNullableWithAggregatesFilter<"Profile"> | string | null
    streakDays?: IntWithAggregatesFilter<"Profile"> | number
    dailyScore?: IntWithAggregatesFilter<"Profile"> | number
    easySolved?: IntWithAggregatesFilter<"Profile"> | number
    mediumSolved?: IntWithAggregatesFilter<"Profile"> | number
    hardSolved?: IntWithAggregatesFilter<"Profile"> | number
    targetCompany?: StringNullableWithAggregatesFilter<"Profile"> | string | null
    companyType?: StringNullableWithAggregatesFilter<"Profile"> | string | null
    specialization?: StringNullableWithAggregatesFilter<"Profile"> | string | null
    experienceLevel?: StringNullableWithAggregatesFilter<"Profile"> | string | null
    targetTimeline?: IntWithAggregatesFilter<"Profile"> | number
    timeAvailable?: StringNullableWithAggregatesFilter<"Profile"> | string | null
    currentSkills?: JsonWithAggregatesFilter<"Profile">
    onboardingCompleted?: BoolWithAggregatesFilter<"Profile"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Profile"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Profile"> | Date | string
  }

  export type ResumeWhereInput = {
    AND?: ResumeWhereInput | ResumeWhereInput[]
    OR?: ResumeWhereInput[]
    NOT?: ResumeWhereInput | ResumeWhereInput[]
    id?: StringFilter<"Resume"> | string
    userId?: StringFilter<"Resume"> | string
    title?: StringFilter<"Resume"> | string
    createdAt?: DateTimeFilter<"Resume"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    versions?: ResumeVersionListRelationFilter
  }

  export type ResumeOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
    versions?: ResumeVersionOrderByRelationAggregateInput
  }

  export type ResumeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ResumeWhereInput | ResumeWhereInput[]
    OR?: ResumeWhereInput[]
    NOT?: ResumeWhereInput | ResumeWhereInput[]
    userId?: StringFilter<"Resume"> | string
    title?: StringFilter<"Resume"> | string
    createdAt?: DateTimeFilter<"Resume"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    versions?: ResumeVersionListRelationFilter
  }, "id">

  export type ResumeOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    createdAt?: SortOrder
    _count?: ResumeCountOrderByAggregateInput
    _max?: ResumeMaxOrderByAggregateInput
    _min?: ResumeMinOrderByAggregateInput
  }

  export type ResumeScalarWhereWithAggregatesInput = {
    AND?: ResumeScalarWhereWithAggregatesInput | ResumeScalarWhereWithAggregatesInput[]
    OR?: ResumeScalarWhereWithAggregatesInput[]
    NOT?: ResumeScalarWhereWithAggregatesInput | ResumeScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Resume"> | string
    userId?: StringWithAggregatesFilter<"Resume"> | string
    title?: StringWithAggregatesFilter<"Resume"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Resume"> | Date | string
  }

  export type ResumeVersionWhereInput = {
    AND?: ResumeVersionWhereInput | ResumeVersionWhereInput[]
    OR?: ResumeVersionWhereInput[]
    NOT?: ResumeVersionWhereInput | ResumeVersionWhereInput[]
    id?: StringFilter<"ResumeVersion"> | string
    resumeId?: StringFilter<"ResumeVersion"> | string
    fileUrl?: StringFilter<"ResumeVersion"> | string
    extractedText?: StringFilter<"ResumeVersion"> | string
    versionNo?: IntFilter<"ResumeVersion"> | number
    createdAt?: DateTimeFilter<"ResumeVersion"> | Date | string
    resume?: XOR<ResumeScalarRelationFilter, ResumeWhereInput>
    analysis?: XOR<ResumeAnalysisNullableScalarRelationFilter, ResumeAnalysisWhereInput> | null
  }

  export type ResumeVersionOrderByWithRelationInput = {
    id?: SortOrder
    resumeId?: SortOrder
    fileUrl?: SortOrder
    extractedText?: SortOrder
    versionNo?: SortOrder
    createdAt?: SortOrder
    resume?: ResumeOrderByWithRelationInput
    analysis?: ResumeAnalysisOrderByWithRelationInput
  }

  export type ResumeVersionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ResumeVersionWhereInput | ResumeVersionWhereInput[]
    OR?: ResumeVersionWhereInput[]
    NOT?: ResumeVersionWhereInput | ResumeVersionWhereInput[]
    resumeId?: StringFilter<"ResumeVersion"> | string
    fileUrl?: StringFilter<"ResumeVersion"> | string
    extractedText?: StringFilter<"ResumeVersion"> | string
    versionNo?: IntFilter<"ResumeVersion"> | number
    createdAt?: DateTimeFilter<"ResumeVersion"> | Date | string
    resume?: XOR<ResumeScalarRelationFilter, ResumeWhereInput>
    analysis?: XOR<ResumeAnalysisNullableScalarRelationFilter, ResumeAnalysisWhereInput> | null
  }, "id">

  export type ResumeVersionOrderByWithAggregationInput = {
    id?: SortOrder
    resumeId?: SortOrder
    fileUrl?: SortOrder
    extractedText?: SortOrder
    versionNo?: SortOrder
    createdAt?: SortOrder
    _count?: ResumeVersionCountOrderByAggregateInput
    _avg?: ResumeVersionAvgOrderByAggregateInput
    _max?: ResumeVersionMaxOrderByAggregateInput
    _min?: ResumeVersionMinOrderByAggregateInput
    _sum?: ResumeVersionSumOrderByAggregateInput
  }

  export type ResumeVersionScalarWhereWithAggregatesInput = {
    AND?: ResumeVersionScalarWhereWithAggregatesInput | ResumeVersionScalarWhereWithAggregatesInput[]
    OR?: ResumeVersionScalarWhereWithAggregatesInput[]
    NOT?: ResumeVersionScalarWhereWithAggregatesInput | ResumeVersionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ResumeVersion"> | string
    resumeId?: StringWithAggregatesFilter<"ResumeVersion"> | string
    fileUrl?: StringWithAggregatesFilter<"ResumeVersion"> | string
    extractedText?: StringWithAggregatesFilter<"ResumeVersion"> | string
    versionNo?: IntWithAggregatesFilter<"ResumeVersion"> | number
    createdAt?: DateTimeWithAggregatesFilter<"ResumeVersion"> | Date | string
  }

  export type ResumeAnalysisWhereInput = {
    AND?: ResumeAnalysisWhereInput | ResumeAnalysisWhereInput[]
    OR?: ResumeAnalysisWhereInput[]
    NOT?: ResumeAnalysisWhereInput | ResumeAnalysisWhereInput[]
    id?: StringFilter<"ResumeAnalysis"> | string
    resumeVersionId?: StringFilter<"ResumeAnalysis"> | string
    atsScore?: IntFilter<"ResumeAnalysis"> | number
    compatibilityText?: StringFilter<"ResumeAnalysis"> | string
    suggestions?: JsonFilter<"ResumeAnalysis">
    missingKeywords?: StringNullableListFilter<"ResumeAnalysis">
    createdAt?: DateTimeFilter<"ResumeAnalysis"> | Date | string
    resumeVersion?: XOR<ResumeVersionScalarRelationFilter, ResumeVersionWhereInput>
  }

  export type ResumeAnalysisOrderByWithRelationInput = {
    id?: SortOrder
    resumeVersionId?: SortOrder
    atsScore?: SortOrder
    compatibilityText?: SortOrder
    suggestions?: SortOrder
    missingKeywords?: SortOrder
    createdAt?: SortOrder
    resumeVersion?: ResumeVersionOrderByWithRelationInput
  }

  export type ResumeAnalysisWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    resumeVersionId?: string
    AND?: ResumeAnalysisWhereInput | ResumeAnalysisWhereInput[]
    OR?: ResumeAnalysisWhereInput[]
    NOT?: ResumeAnalysisWhereInput | ResumeAnalysisWhereInput[]
    atsScore?: IntFilter<"ResumeAnalysis"> | number
    compatibilityText?: StringFilter<"ResumeAnalysis"> | string
    suggestions?: JsonFilter<"ResumeAnalysis">
    missingKeywords?: StringNullableListFilter<"ResumeAnalysis">
    createdAt?: DateTimeFilter<"ResumeAnalysis"> | Date | string
    resumeVersion?: XOR<ResumeVersionScalarRelationFilter, ResumeVersionWhereInput>
  }, "id" | "resumeVersionId">

  export type ResumeAnalysisOrderByWithAggregationInput = {
    id?: SortOrder
    resumeVersionId?: SortOrder
    atsScore?: SortOrder
    compatibilityText?: SortOrder
    suggestions?: SortOrder
    missingKeywords?: SortOrder
    createdAt?: SortOrder
    _count?: ResumeAnalysisCountOrderByAggregateInput
    _avg?: ResumeAnalysisAvgOrderByAggregateInput
    _max?: ResumeAnalysisMaxOrderByAggregateInput
    _min?: ResumeAnalysisMinOrderByAggregateInput
    _sum?: ResumeAnalysisSumOrderByAggregateInput
  }

  export type ResumeAnalysisScalarWhereWithAggregatesInput = {
    AND?: ResumeAnalysisScalarWhereWithAggregatesInput | ResumeAnalysisScalarWhereWithAggregatesInput[]
    OR?: ResumeAnalysisScalarWhereWithAggregatesInput[]
    NOT?: ResumeAnalysisScalarWhereWithAggregatesInput | ResumeAnalysisScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ResumeAnalysis"> | string
    resumeVersionId?: StringWithAggregatesFilter<"ResumeAnalysis"> | string
    atsScore?: IntWithAggregatesFilter<"ResumeAnalysis"> | number
    compatibilityText?: StringWithAggregatesFilter<"ResumeAnalysis"> | string
    suggestions?: JsonWithAggregatesFilter<"ResumeAnalysis">
    missingKeywords?: StringNullableListFilter<"ResumeAnalysis">
    createdAt?: DateTimeWithAggregatesFilter<"ResumeAnalysis"> | Date | string
  }

  export type ApplicationWhereInput = {
    AND?: ApplicationWhereInput | ApplicationWhereInput[]
    OR?: ApplicationWhereInput[]
    NOT?: ApplicationWhereInput | ApplicationWhereInput[]
    id?: StringFilter<"Application"> | string
    userId?: StringFilter<"Application"> | string
    title?: StringFilter<"Application"> | string
    company?: StringFilter<"Application"> | string
    status?: StringFilter<"Application"> | string
    priorityFlag?: BoolFilter<"Application"> | boolean
    location?: StringNullableFilter<"Application"> | string | null
    appliedDate?: DateTimeNullableFilter<"Application"> | Date | string | null
    createdAt?: DateTimeFilter<"Application"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type ApplicationOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    company?: SortOrder
    status?: SortOrder
    priorityFlag?: SortOrder
    location?: SortOrderInput | SortOrder
    appliedDate?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type ApplicationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ApplicationWhereInput | ApplicationWhereInput[]
    OR?: ApplicationWhereInput[]
    NOT?: ApplicationWhereInput | ApplicationWhereInput[]
    userId?: StringFilter<"Application"> | string
    title?: StringFilter<"Application"> | string
    company?: StringFilter<"Application"> | string
    status?: StringFilter<"Application"> | string
    priorityFlag?: BoolFilter<"Application"> | boolean
    location?: StringNullableFilter<"Application"> | string | null
    appliedDate?: DateTimeNullableFilter<"Application"> | Date | string | null
    createdAt?: DateTimeFilter<"Application"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type ApplicationOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    company?: SortOrder
    status?: SortOrder
    priorityFlag?: SortOrder
    location?: SortOrderInput | SortOrder
    appliedDate?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: ApplicationCountOrderByAggregateInput
    _max?: ApplicationMaxOrderByAggregateInput
    _min?: ApplicationMinOrderByAggregateInput
  }

  export type ApplicationScalarWhereWithAggregatesInput = {
    AND?: ApplicationScalarWhereWithAggregatesInput | ApplicationScalarWhereWithAggregatesInput[]
    OR?: ApplicationScalarWhereWithAggregatesInput[]
    NOT?: ApplicationScalarWhereWithAggregatesInput | ApplicationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Application"> | string
    userId?: StringWithAggregatesFilter<"Application"> | string
    title?: StringWithAggregatesFilter<"Application"> | string
    company?: StringWithAggregatesFilter<"Application"> | string
    status?: StringWithAggregatesFilter<"Application"> | string
    priorityFlag?: BoolWithAggregatesFilter<"Application"> | boolean
    location?: StringNullableWithAggregatesFilter<"Application"> | string | null
    appliedDate?: DateTimeNullableWithAggregatesFilter<"Application"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Application"> | Date | string
  }

  export type CareerRoadmapWhereInput = {
    AND?: CareerRoadmapWhereInput | CareerRoadmapWhereInput[]
    OR?: CareerRoadmapWhereInput[]
    NOT?: CareerRoadmapWhereInput | CareerRoadmapWhereInput[]
    id?: StringFilter<"CareerRoadmap"> | string
    userId?: StringFilter<"CareerRoadmap"> | string
    title?: StringFilter<"CareerRoadmap"> | string
    duration?: IntFilter<"CareerRoadmap"> | number
    skillLevel?: StringFilter<"CareerRoadmap"> | string
    createdAt?: DateTimeFilter<"CareerRoadmap"> | Date | string
    checkedTasks?: JsonFilter<"CareerRoadmap">
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    milestones?: RoadmapMilestoneListRelationFilter
  }

  export type CareerRoadmapOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    duration?: SortOrder
    skillLevel?: SortOrder
    createdAt?: SortOrder
    checkedTasks?: SortOrder
    user?: UserOrderByWithRelationInput
    milestones?: RoadmapMilestoneOrderByRelationAggregateInput
  }

  export type CareerRoadmapWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CareerRoadmapWhereInput | CareerRoadmapWhereInput[]
    OR?: CareerRoadmapWhereInput[]
    NOT?: CareerRoadmapWhereInput | CareerRoadmapWhereInput[]
    userId?: StringFilter<"CareerRoadmap"> | string
    title?: StringFilter<"CareerRoadmap"> | string
    duration?: IntFilter<"CareerRoadmap"> | number
    skillLevel?: StringFilter<"CareerRoadmap"> | string
    createdAt?: DateTimeFilter<"CareerRoadmap"> | Date | string
    checkedTasks?: JsonFilter<"CareerRoadmap">
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    milestones?: RoadmapMilestoneListRelationFilter
  }, "id">

  export type CareerRoadmapOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    duration?: SortOrder
    skillLevel?: SortOrder
    createdAt?: SortOrder
    checkedTasks?: SortOrder
    _count?: CareerRoadmapCountOrderByAggregateInput
    _avg?: CareerRoadmapAvgOrderByAggregateInput
    _max?: CareerRoadmapMaxOrderByAggregateInput
    _min?: CareerRoadmapMinOrderByAggregateInput
    _sum?: CareerRoadmapSumOrderByAggregateInput
  }

  export type CareerRoadmapScalarWhereWithAggregatesInput = {
    AND?: CareerRoadmapScalarWhereWithAggregatesInput | CareerRoadmapScalarWhereWithAggregatesInput[]
    OR?: CareerRoadmapScalarWhereWithAggregatesInput[]
    NOT?: CareerRoadmapScalarWhereWithAggregatesInput | CareerRoadmapScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CareerRoadmap"> | string
    userId?: StringWithAggregatesFilter<"CareerRoadmap"> | string
    title?: StringWithAggregatesFilter<"CareerRoadmap"> | string
    duration?: IntWithAggregatesFilter<"CareerRoadmap"> | number
    skillLevel?: StringWithAggregatesFilter<"CareerRoadmap"> | string
    createdAt?: DateTimeWithAggregatesFilter<"CareerRoadmap"> | Date | string
    checkedTasks?: JsonWithAggregatesFilter<"CareerRoadmap">
  }

  export type RoadmapMilestoneWhereInput = {
    AND?: RoadmapMilestoneWhereInput | RoadmapMilestoneWhereInput[]
    OR?: RoadmapMilestoneWhereInput[]
    NOT?: RoadmapMilestoneWhereInput | RoadmapMilestoneWhereInput[]
    id?: StringFilter<"RoadmapMilestone"> | string
    roadmapId?: StringFilter<"RoadmapMilestone"> | string
    monthNo?: IntFilter<"RoadmapMilestone"> | number
    title?: StringFilter<"RoadmapMilestone"> | string
    weeksData?: JsonFilter<"RoadmapMilestone">
    roadmap?: XOR<CareerRoadmapScalarRelationFilter, CareerRoadmapWhereInput>
  }

  export type RoadmapMilestoneOrderByWithRelationInput = {
    id?: SortOrder
    roadmapId?: SortOrder
    monthNo?: SortOrder
    title?: SortOrder
    weeksData?: SortOrder
    roadmap?: CareerRoadmapOrderByWithRelationInput
  }

  export type RoadmapMilestoneWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: RoadmapMilestoneWhereInput | RoadmapMilestoneWhereInput[]
    OR?: RoadmapMilestoneWhereInput[]
    NOT?: RoadmapMilestoneWhereInput | RoadmapMilestoneWhereInput[]
    roadmapId?: StringFilter<"RoadmapMilestone"> | string
    monthNo?: IntFilter<"RoadmapMilestone"> | number
    title?: StringFilter<"RoadmapMilestone"> | string
    weeksData?: JsonFilter<"RoadmapMilestone">
    roadmap?: XOR<CareerRoadmapScalarRelationFilter, CareerRoadmapWhereInput>
  }, "id">

  export type RoadmapMilestoneOrderByWithAggregationInput = {
    id?: SortOrder
    roadmapId?: SortOrder
    monthNo?: SortOrder
    title?: SortOrder
    weeksData?: SortOrder
    _count?: RoadmapMilestoneCountOrderByAggregateInput
    _avg?: RoadmapMilestoneAvgOrderByAggregateInput
    _max?: RoadmapMilestoneMaxOrderByAggregateInput
    _min?: RoadmapMilestoneMinOrderByAggregateInput
    _sum?: RoadmapMilestoneSumOrderByAggregateInput
  }

  export type RoadmapMilestoneScalarWhereWithAggregatesInput = {
    AND?: RoadmapMilestoneScalarWhereWithAggregatesInput | RoadmapMilestoneScalarWhereWithAggregatesInput[]
    OR?: RoadmapMilestoneScalarWhereWithAggregatesInput[]
    NOT?: RoadmapMilestoneScalarWhereWithAggregatesInput | RoadmapMilestoneScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"RoadmapMilestone"> | string
    roadmapId?: StringWithAggregatesFilter<"RoadmapMilestone"> | string
    monthNo?: IntWithAggregatesFilter<"RoadmapMilestone"> | number
    title?: StringWithAggregatesFilter<"RoadmapMilestone"> | string
    weeksData?: JsonWithAggregatesFilter<"RoadmapMilestone">
  }

  export type InterviewSessionWhereInput = {
    AND?: InterviewSessionWhereInput | InterviewSessionWhereInput[]
    OR?: InterviewSessionWhereInput[]
    NOT?: InterviewSessionWhereInput | InterviewSessionWhereInput[]
    id?: StringFilter<"InterviewSession"> | string
    userId?: StringFilter<"InterviewSession"> | string
    roleContext?: StringFilter<"InterviewSession"> | string
    overallScore?: IntNullableFilter<"InterviewSession"> | number | null
    readinessLevel?: StringNullableFilter<"InterviewSession"> | string | null
    strengths?: StringNullableListFilter<"InterviewSession">
    improvements?: StringNullableListFilter<"InterviewSession">
    createdAt?: DateTimeFilter<"InterviewSession"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    questions?: InterviewQuestionListRelationFilter
  }

  export type InterviewSessionOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    roleContext?: SortOrder
    overallScore?: SortOrderInput | SortOrder
    readinessLevel?: SortOrderInput | SortOrder
    strengths?: SortOrder
    improvements?: SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
    questions?: InterviewQuestionOrderByRelationAggregateInput
  }

  export type InterviewSessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: InterviewSessionWhereInput | InterviewSessionWhereInput[]
    OR?: InterviewSessionWhereInput[]
    NOT?: InterviewSessionWhereInput | InterviewSessionWhereInput[]
    userId?: StringFilter<"InterviewSession"> | string
    roleContext?: StringFilter<"InterviewSession"> | string
    overallScore?: IntNullableFilter<"InterviewSession"> | number | null
    readinessLevel?: StringNullableFilter<"InterviewSession"> | string | null
    strengths?: StringNullableListFilter<"InterviewSession">
    improvements?: StringNullableListFilter<"InterviewSession">
    createdAt?: DateTimeFilter<"InterviewSession"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    questions?: InterviewQuestionListRelationFilter
  }, "id">

  export type InterviewSessionOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    roleContext?: SortOrder
    overallScore?: SortOrderInput | SortOrder
    readinessLevel?: SortOrderInput | SortOrder
    strengths?: SortOrder
    improvements?: SortOrder
    createdAt?: SortOrder
    _count?: InterviewSessionCountOrderByAggregateInput
    _avg?: InterviewSessionAvgOrderByAggregateInput
    _max?: InterviewSessionMaxOrderByAggregateInput
    _min?: InterviewSessionMinOrderByAggregateInput
    _sum?: InterviewSessionSumOrderByAggregateInput
  }

  export type InterviewSessionScalarWhereWithAggregatesInput = {
    AND?: InterviewSessionScalarWhereWithAggregatesInput | InterviewSessionScalarWhereWithAggregatesInput[]
    OR?: InterviewSessionScalarWhereWithAggregatesInput[]
    NOT?: InterviewSessionScalarWhereWithAggregatesInput | InterviewSessionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"InterviewSession"> | string
    userId?: StringWithAggregatesFilter<"InterviewSession"> | string
    roleContext?: StringWithAggregatesFilter<"InterviewSession"> | string
    overallScore?: IntNullableWithAggregatesFilter<"InterviewSession"> | number | null
    readinessLevel?: StringNullableWithAggregatesFilter<"InterviewSession"> | string | null
    strengths?: StringNullableListFilter<"InterviewSession">
    improvements?: StringNullableListFilter<"InterviewSession">
    createdAt?: DateTimeWithAggregatesFilter<"InterviewSession"> | Date | string
  }

  export type InterviewQuestionWhereInput = {
    AND?: InterviewQuestionWhereInput | InterviewQuestionWhereInput[]
    OR?: InterviewQuestionWhereInput[]
    NOT?: InterviewQuestionWhereInput | InterviewQuestionWhereInput[]
    id?: StringFilter<"InterviewQuestion"> | string
    sessionId?: StringFilter<"InterviewQuestion"> | string
    questionText?: StringFilter<"InterviewQuestion"> | string
    answerText?: StringNullableFilter<"InterviewQuestion"> | string | null
    rating?: IntNullableFilter<"InterviewQuestion"> | number | null
    confidence?: StringNullableFilter<"InterviewQuestion"> | string | null
    feedbackText?: StringNullableFilter<"InterviewQuestion"> | string | null
    session?: XOR<InterviewSessionScalarRelationFilter, InterviewSessionWhereInput>
  }

  export type InterviewQuestionOrderByWithRelationInput = {
    id?: SortOrder
    sessionId?: SortOrder
    questionText?: SortOrder
    answerText?: SortOrderInput | SortOrder
    rating?: SortOrderInput | SortOrder
    confidence?: SortOrderInput | SortOrder
    feedbackText?: SortOrderInput | SortOrder
    session?: InterviewSessionOrderByWithRelationInput
  }

  export type InterviewQuestionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: InterviewQuestionWhereInput | InterviewQuestionWhereInput[]
    OR?: InterviewQuestionWhereInput[]
    NOT?: InterviewQuestionWhereInput | InterviewQuestionWhereInput[]
    sessionId?: StringFilter<"InterviewQuestion"> | string
    questionText?: StringFilter<"InterviewQuestion"> | string
    answerText?: StringNullableFilter<"InterviewQuestion"> | string | null
    rating?: IntNullableFilter<"InterviewQuestion"> | number | null
    confidence?: StringNullableFilter<"InterviewQuestion"> | string | null
    feedbackText?: StringNullableFilter<"InterviewQuestion"> | string | null
    session?: XOR<InterviewSessionScalarRelationFilter, InterviewSessionWhereInput>
  }, "id">

  export type InterviewQuestionOrderByWithAggregationInput = {
    id?: SortOrder
    sessionId?: SortOrder
    questionText?: SortOrder
    answerText?: SortOrderInput | SortOrder
    rating?: SortOrderInput | SortOrder
    confidence?: SortOrderInput | SortOrder
    feedbackText?: SortOrderInput | SortOrder
    _count?: InterviewQuestionCountOrderByAggregateInput
    _avg?: InterviewQuestionAvgOrderByAggregateInput
    _max?: InterviewQuestionMaxOrderByAggregateInput
    _min?: InterviewQuestionMinOrderByAggregateInput
    _sum?: InterviewQuestionSumOrderByAggregateInput
  }

  export type InterviewQuestionScalarWhereWithAggregatesInput = {
    AND?: InterviewQuestionScalarWhereWithAggregatesInput | InterviewQuestionScalarWhereWithAggregatesInput[]
    OR?: InterviewQuestionScalarWhereWithAggregatesInput[]
    NOT?: InterviewQuestionScalarWhereWithAggregatesInput | InterviewQuestionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"InterviewQuestion"> | string
    sessionId?: StringWithAggregatesFilter<"InterviewQuestion"> | string
    questionText?: StringWithAggregatesFilter<"InterviewQuestion"> | string
    answerText?: StringNullableWithAggregatesFilter<"InterviewQuestion"> | string | null
    rating?: IntNullableWithAggregatesFilter<"InterviewQuestion"> | number | null
    confidence?: StringNullableWithAggregatesFilter<"InterviewQuestion"> | string | null
    feedbackText?: StringNullableWithAggregatesFilter<"InterviewQuestion"> | string | null
  }

  export type ActionItemWhereInput = {
    AND?: ActionItemWhereInput | ActionItemWhereInput[]
    OR?: ActionItemWhereInput[]
    NOT?: ActionItemWhereInput | ActionItemWhereInput[]
    id?: StringFilter<"ActionItem"> | string
    userId?: StringFilter<"ActionItem"> | string
    title?: StringFilter<"ActionItem"> | string
    description?: StringFilter<"ActionItem"> | string
    priority?: StringFilter<"ActionItem"> | string
    status?: StringFilter<"ActionItem"> | string
    source?: StringFilter<"ActionItem"> | string
    skillGap?: StringNullableFilter<"ActionItem"> | string | null
    estimatedMinutes?: IntFilter<"ActionItem"> | number
    impactText?: StringNullableFilter<"ActionItem"> | string | null
    tasks?: JsonFilter<"ActionItem">
    createdAt?: DateTimeFilter<"ActionItem"> | Date | string
    updatedAt?: DateTimeFilter<"ActionItem"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type ActionItemOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    priority?: SortOrder
    status?: SortOrder
    source?: SortOrder
    skillGap?: SortOrderInput | SortOrder
    estimatedMinutes?: SortOrder
    impactText?: SortOrderInput | SortOrder
    tasks?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type ActionItemWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ActionItemWhereInput | ActionItemWhereInput[]
    OR?: ActionItemWhereInput[]
    NOT?: ActionItemWhereInput | ActionItemWhereInput[]
    userId?: StringFilter<"ActionItem"> | string
    title?: StringFilter<"ActionItem"> | string
    description?: StringFilter<"ActionItem"> | string
    priority?: StringFilter<"ActionItem"> | string
    status?: StringFilter<"ActionItem"> | string
    source?: StringFilter<"ActionItem"> | string
    skillGap?: StringNullableFilter<"ActionItem"> | string | null
    estimatedMinutes?: IntFilter<"ActionItem"> | number
    impactText?: StringNullableFilter<"ActionItem"> | string | null
    tasks?: JsonFilter<"ActionItem">
    createdAt?: DateTimeFilter<"ActionItem"> | Date | string
    updatedAt?: DateTimeFilter<"ActionItem"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type ActionItemOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    priority?: SortOrder
    status?: SortOrder
    source?: SortOrder
    skillGap?: SortOrderInput | SortOrder
    estimatedMinutes?: SortOrder
    impactText?: SortOrderInput | SortOrder
    tasks?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ActionItemCountOrderByAggregateInput
    _avg?: ActionItemAvgOrderByAggregateInput
    _max?: ActionItemMaxOrderByAggregateInput
    _min?: ActionItemMinOrderByAggregateInput
    _sum?: ActionItemSumOrderByAggregateInput
  }

  export type ActionItemScalarWhereWithAggregatesInput = {
    AND?: ActionItemScalarWhereWithAggregatesInput | ActionItemScalarWhereWithAggregatesInput[]
    OR?: ActionItemScalarWhereWithAggregatesInput[]
    NOT?: ActionItemScalarWhereWithAggregatesInput | ActionItemScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ActionItem"> | string
    userId?: StringWithAggregatesFilter<"ActionItem"> | string
    title?: StringWithAggregatesFilter<"ActionItem"> | string
    description?: StringWithAggregatesFilter<"ActionItem"> | string
    priority?: StringWithAggregatesFilter<"ActionItem"> | string
    status?: StringWithAggregatesFilter<"ActionItem"> | string
    source?: StringWithAggregatesFilter<"ActionItem"> | string
    skillGap?: StringNullableWithAggregatesFilter<"ActionItem"> | string | null
    estimatedMinutes?: IntWithAggregatesFilter<"ActionItem"> | number
    impactText?: StringNullableWithAggregatesFilter<"ActionItem"> | string | null
    tasks?: JsonWithAggregatesFilter<"ActionItem">
    createdAt?: DateTimeWithAggregatesFilter<"ActionItem"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ActionItem"> | Date | string
  }

  export type ProjectRecommendationWhereInput = {
    AND?: ProjectRecommendationWhereInput | ProjectRecommendationWhereInput[]
    OR?: ProjectRecommendationWhereInput[]
    NOT?: ProjectRecommendationWhereInput | ProjectRecommendationWhereInput[]
    id?: StringFilter<"ProjectRecommendation"> | string
    userId?: StringFilter<"ProjectRecommendation"> | string
    title?: StringFilter<"ProjectRecommendation"> | string
    description?: StringFilter<"ProjectRecommendation"> | string
    techStack?: StringNullableListFilter<"ProjectRecommendation">
    difficulty?: StringFilter<"ProjectRecommendation"> | string
    resumeValue?: StringFilter<"ProjectRecommendation"> | string
    deliverables?: StringNullableListFilter<"ProjectRecommendation">
    interviewPrep?: StringNullableListFilter<"ProjectRecommendation">
    sourceGap?: StringFilter<"ProjectRecommendation"> | string
    status?: StringFilter<"ProjectRecommendation"> | string
    createdAt?: DateTimeFilter<"ProjectRecommendation"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type ProjectRecommendationOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    techStack?: SortOrder
    difficulty?: SortOrder
    resumeValue?: SortOrder
    deliverables?: SortOrder
    interviewPrep?: SortOrder
    sourceGap?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type ProjectRecommendationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ProjectRecommendationWhereInput | ProjectRecommendationWhereInput[]
    OR?: ProjectRecommendationWhereInput[]
    NOT?: ProjectRecommendationWhereInput | ProjectRecommendationWhereInput[]
    userId?: StringFilter<"ProjectRecommendation"> | string
    title?: StringFilter<"ProjectRecommendation"> | string
    description?: StringFilter<"ProjectRecommendation"> | string
    techStack?: StringNullableListFilter<"ProjectRecommendation">
    difficulty?: StringFilter<"ProjectRecommendation"> | string
    resumeValue?: StringFilter<"ProjectRecommendation"> | string
    deliverables?: StringNullableListFilter<"ProjectRecommendation">
    interviewPrep?: StringNullableListFilter<"ProjectRecommendation">
    sourceGap?: StringFilter<"ProjectRecommendation"> | string
    status?: StringFilter<"ProjectRecommendation"> | string
    createdAt?: DateTimeFilter<"ProjectRecommendation"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type ProjectRecommendationOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    techStack?: SortOrder
    difficulty?: SortOrder
    resumeValue?: SortOrder
    deliverables?: SortOrder
    interviewPrep?: SortOrder
    sourceGap?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    _count?: ProjectRecommendationCountOrderByAggregateInput
    _max?: ProjectRecommendationMaxOrderByAggregateInput
    _min?: ProjectRecommendationMinOrderByAggregateInput
  }

  export type ProjectRecommendationScalarWhereWithAggregatesInput = {
    AND?: ProjectRecommendationScalarWhereWithAggregatesInput | ProjectRecommendationScalarWhereWithAggregatesInput[]
    OR?: ProjectRecommendationScalarWhereWithAggregatesInput[]
    NOT?: ProjectRecommendationScalarWhereWithAggregatesInput | ProjectRecommendationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ProjectRecommendation"> | string
    userId?: StringWithAggregatesFilter<"ProjectRecommendation"> | string
    title?: StringWithAggregatesFilter<"ProjectRecommendation"> | string
    description?: StringWithAggregatesFilter<"ProjectRecommendation"> | string
    techStack?: StringNullableListFilter<"ProjectRecommendation">
    difficulty?: StringWithAggregatesFilter<"ProjectRecommendation"> | string
    resumeValue?: StringWithAggregatesFilter<"ProjectRecommendation"> | string
    deliverables?: StringNullableListFilter<"ProjectRecommendation">
    interviewPrep?: StringNullableListFilter<"ProjectRecommendation">
    sourceGap?: StringWithAggregatesFilter<"ProjectRecommendation"> | string
    status?: StringWithAggregatesFilter<"ProjectRecommendation"> | string
    createdAt?: DateTimeWithAggregatesFilter<"ProjectRecommendation"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    passwordHash: string
    createdAt?: Date | string
    updatedAt?: Date | string
    profile?: ProfileCreateNestedOneWithoutUserInput
    resumes?: ResumeCreateNestedManyWithoutUserInput
    applications?: ApplicationCreateNestedManyWithoutUserInput
    roadmaps?: CareerRoadmapCreateNestedManyWithoutUserInput
    interviewSessions?: InterviewSessionCreateNestedManyWithoutUserInput
    actionItems?: ActionItemCreateNestedManyWithoutUserInput
    projects?: ProjectRecommendationCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    passwordHash: string
    createdAt?: Date | string
    updatedAt?: Date | string
    profile?: ProfileUncheckedCreateNestedOneWithoutUserInput
    resumes?: ResumeUncheckedCreateNestedManyWithoutUserInput
    applications?: ApplicationUncheckedCreateNestedManyWithoutUserInput
    roadmaps?: CareerRoadmapUncheckedCreateNestedManyWithoutUserInput
    interviewSessions?: InterviewSessionUncheckedCreateNestedManyWithoutUserInput
    actionItems?: ActionItemUncheckedCreateNestedManyWithoutUserInput
    projects?: ProjectRecommendationUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profile?: ProfileUpdateOneWithoutUserNestedInput
    resumes?: ResumeUpdateManyWithoutUserNestedInput
    applications?: ApplicationUpdateManyWithoutUserNestedInput
    roadmaps?: CareerRoadmapUpdateManyWithoutUserNestedInput
    interviewSessions?: InterviewSessionUpdateManyWithoutUserNestedInput
    actionItems?: ActionItemUpdateManyWithoutUserNestedInput
    projects?: ProjectRecommendationUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profile?: ProfileUncheckedUpdateOneWithoutUserNestedInput
    resumes?: ResumeUncheckedUpdateManyWithoutUserNestedInput
    applications?: ApplicationUncheckedUpdateManyWithoutUserNestedInput
    roadmaps?: CareerRoadmapUncheckedUpdateManyWithoutUserNestedInput
    interviewSessions?: InterviewSessionUncheckedUpdateManyWithoutUserNestedInput
    actionItems?: ActionItemUncheckedUpdateManyWithoutUserNestedInput
    projects?: ProjectRecommendationUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    passwordHash: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProfileCreateInput = {
    id?: string
    fullName: string
    targetRole?: string | null
    targetLevel?: string | null
    streakDays?: number
    dailyScore?: number
    easySolved?: number
    mediumSolved?: number
    hardSolved?: number
    targetCompany?: string | null
    companyType?: string | null
    specialization?: string | null
    experienceLevel?: string | null
    targetTimeline?: number
    timeAvailable?: string | null
    currentSkills?: JsonNullValueInput | InputJsonValue
    onboardingCompleted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutProfileInput
  }

  export type ProfileUncheckedCreateInput = {
    id?: string
    userId: string
    fullName: string
    targetRole?: string | null
    targetLevel?: string | null
    streakDays?: number
    dailyScore?: number
    easySolved?: number
    mediumSolved?: number
    hardSolved?: number
    targetCompany?: string | null
    companyType?: string | null
    specialization?: string | null
    experienceLevel?: string | null
    targetTimeline?: number
    timeAvailable?: string | null
    currentSkills?: JsonNullValueInput | InputJsonValue
    onboardingCompleted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProfileUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    targetRole?: NullableStringFieldUpdateOperationsInput | string | null
    targetLevel?: NullableStringFieldUpdateOperationsInput | string | null
    streakDays?: IntFieldUpdateOperationsInput | number
    dailyScore?: IntFieldUpdateOperationsInput | number
    easySolved?: IntFieldUpdateOperationsInput | number
    mediumSolved?: IntFieldUpdateOperationsInput | number
    hardSolved?: IntFieldUpdateOperationsInput | number
    targetCompany?: NullableStringFieldUpdateOperationsInput | string | null
    companyType?: NullableStringFieldUpdateOperationsInput | string | null
    specialization?: NullableStringFieldUpdateOperationsInput | string | null
    experienceLevel?: NullableStringFieldUpdateOperationsInput | string | null
    targetTimeline?: IntFieldUpdateOperationsInput | number
    timeAvailable?: NullableStringFieldUpdateOperationsInput | string | null
    currentSkills?: JsonNullValueInput | InputJsonValue
    onboardingCompleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutProfileNestedInput
  }

  export type ProfileUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    targetRole?: NullableStringFieldUpdateOperationsInput | string | null
    targetLevel?: NullableStringFieldUpdateOperationsInput | string | null
    streakDays?: IntFieldUpdateOperationsInput | number
    dailyScore?: IntFieldUpdateOperationsInput | number
    easySolved?: IntFieldUpdateOperationsInput | number
    mediumSolved?: IntFieldUpdateOperationsInput | number
    hardSolved?: IntFieldUpdateOperationsInput | number
    targetCompany?: NullableStringFieldUpdateOperationsInput | string | null
    companyType?: NullableStringFieldUpdateOperationsInput | string | null
    specialization?: NullableStringFieldUpdateOperationsInput | string | null
    experienceLevel?: NullableStringFieldUpdateOperationsInput | string | null
    targetTimeline?: IntFieldUpdateOperationsInput | number
    timeAvailable?: NullableStringFieldUpdateOperationsInput | string | null
    currentSkills?: JsonNullValueInput | InputJsonValue
    onboardingCompleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProfileCreateManyInput = {
    id?: string
    userId: string
    fullName: string
    targetRole?: string | null
    targetLevel?: string | null
    streakDays?: number
    dailyScore?: number
    easySolved?: number
    mediumSolved?: number
    hardSolved?: number
    targetCompany?: string | null
    companyType?: string | null
    specialization?: string | null
    experienceLevel?: string | null
    targetTimeline?: number
    timeAvailable?: string | null
    currentSkills?: JsonNullValueInput | InputJsonValue
    onboardingCompleted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProfileUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    targetRole?: NullableStringFieldUpdateOperationsInput | string | null
    targetLevel?: NullableStringFieldUpdateOperationsInput | string | null
    streakDays?: IntFieldUpdateOperationsInput | number
    dailyScore?: IntFieldUpdateOperationsInput | number
    easySolved?: IntFieldUpdateOperationsInput | number
    mediumSolved?: IntFieldUpdateOperationsInput | number
    hardSolved?: IntFieldUpdateOperationsInput | number
    targetCompany?: NullableStringFieldUpdateOperationsInput | string | null
    companyType?: NullableStringFieldUpdateOperationsInput | string | null
    specialization?: NullableStringFieldUpdateOperationsInput | string | null
    experienceLevel?: NullableStringFieldUpdateOperationsInput | string | null
    targetTimeline?: IntFieldUpdateOperationsInput | number
    timeAvailable?: NullableStringFieldUpdateOperationsInput | string | null
    currentSkills?: JsonNullValueInput | InputJsonValue
    onboardingCompleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProfileUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    targetRole?: NullableStringFieldUpdateOperationsInput | string | null
    targetLevel?: NullableStringFieldUpdateOperationsInput | string | null
    streakDays?: IntFieldUpdateOperationsInput | number
    dailyScore?: IntFieldUpdateOperationsInput | number
    easySolved?: IntFieldUpdateOperationsInput | number
    mediumSolved?: IntFieldUpdateOperationsInput | number
    hardSolved?: IntFieldUpdateOperationsInput | number
    targetCompany?: NullableStringFieldUpdateOperationsInput | string | null
    companyType?: NullableStringFieldUpdateOperationsInput | string | null
    specialization?: NullableStringFieldUpdateOperationsInput | string | null
    experienceLevel?: NullableStringFieldUpdateOperationsInput | string | null
    targetTimeline?: IntFieldUpdateOperationsInput | number
    timeAvailable?: NullableStringFieldUpdateOperationsInput | string | null
    currentSkills?: JsonNullValueInput | InputJsonValue
    onboardingCompleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ResumeCreateInput = {
    id?: string
    title?: string
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutResumesInput
    versions?: ResumeVersionCreateNestedManyWithoutResumeInput
  }

  export type ResumeUncheckedCreateInput = {
    id?: string
    userId: string
    title?: string
    createdAt?: Date | string
    versions?: ResumeVersionUncheckedCreateNestedManyWithoutResumeInput
  }

  export type ResumeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutResumesNestedInput
    versions?: ResumeVersionUpdateManyWithoutResumeNestedInput
  }

  export type ResumeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    versions?: ResumeVersionUncheckedUpdateManyWithoutResumeNestedInput
  }

  export type ResumeCreateManyInput = {
    id?: string
    userId: string
    title?: string
    createdAt?: Date | string
  }

  export type ResumeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ResumeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ResumeVersionCreateInput = {
    id?: string
    fileUrl: string
    extractedText: string
    versionNo?: number
    createdAt?: Date | string
    resume: ResumeCreateNestedOneWithoutVersionsInput
    analysis?: ResumeAnalysisCreateNestedOneWithoutResumeVersionInput
  }

  export type ResumeVersionUncheckedCreateInput = {
    id?: string
    resumeId: string
    fileUrl: string
    extractedText: string
    versionNo?: number
    createdAt?: Date | string
    analysis?: ResumeAnalysisUncheckedCreateNestedOneWithoutResumeVersionInput
  }

  export type ResumeVersionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    extractedText?: StringFieldUpdateOperationsInput | string
    versionNo?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resume?: ResumeUpdateOneRequiredWithoutVersionsNestedInput
    analysis?: ResumeAnalysisUpdateOneWithoutResumeVersionNestedInput
  }

  export type ResumeVersionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    resumeId?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    extractedText?: StringFieldUpdateOperationsInput | string
    versionNo?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    analysis?: ResumeAnalysisUncheckedUpdateOneWithoutResumeVersionNestedInput
  }

  export type ResumeVersionCreateManyInput = {
    id?: string
    resumeId: string
    fileUrl: string
    extractedText: string
    versionNo?: number
    createdAt?: Date | string
  }

  export type ResumeVersionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    extractedText?: StringFieldUpdateOperationsInput | string
    versionNo?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ResumeVersionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    resumeId?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    extractedText?: StringFieldUpdateOperationsInput | string
    versionNo?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ResumeAnalysisCreateInput = {
    id?: string
    atsScore: number
    compatibilityText: string
    suggestions?: JsonNullValueInput | InputJsonValue
    missingKeywords?: ResumeAnalysisCreatemissingKeywordsInput | string[]
    createdAt?: Date | string
    resumeVersion: ResumeVersionCreateNestedOneWithoutAnalysisInput
  }

  export type ResumeAnalysisUncheckedCreateInput = {
    id?: string
    resumeVersionId: string
    atsScore: number
    compatibilityText: string
    suggestions?: JsonNullValueInput | InputJsonValue
    missingKeywords?: ResumeAnalysisCreatemissingKeywordsInput | string[]
    createdAt?: Date | string
  }

  export type ResumeAnalysisUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    atsScore?: IntFieldUpdateOperationsInput | number
    compatibilityText?: StringFieldUpdateOperationsInput | string
    suggestions?: JsonNullValueInput | InputJsonValue
    missingKeywords?: ResumeAnalysisUpdatemissingKeywordsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resumeVersion?: ResumeVersionUpdateOneRequiredWithoutAnalysisNestedInput
  }

  export type ResumeAnalysisUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    resumeVersionId?: StringFieldUpdateOperationsInput | string
    atsScore?: IntFieldUpdateOperationsInput | number
    compatibilityText?: StringFieldUpdateOperationsInput | string
    suggestions?: JsonNullValueInput | InputJsonValue
    missingKeywords?: ResumeAnalysisUpdatemissingKeywordsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ResumeAnalysisCreateManyInput = {
    id?: string
    resumeVersionId: string
    atsScore: number
    compatibilityText: string
    suggestions?: JsonNullValueInput | InputJsonValue
    missingKeywords?: ResumeAnalysisCreatemissingKeywordsInput | string[]
    createdAt?: Date | string
  }

  export type ResumeAnalysisUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    atsScore?: IntFieldUpdateOperationsInput | number
    compatibilityText?: StringFieldUpdateOperationsInput | string
    suggestions?: JsonNullValueInput | InputJsonValue
    missingKeywords?: ResumeAnalysisUpdatemissingKeywordsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ResumeAnalysisUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    resumeVersionId?: StringFieldUpdateOperationsInput | string
    atsScore?: IntFieldUpdateOperationsInput | number
    compatibilityText?: StringFieldUpdateOperationsInput | string
    suggestions?: JsonNullValueInput | InputJsonValue
    missingKeywords?: ResumeAnalysisUpdatemissingKeywordsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ApplicationCreateInput = {
    id?: string
    title: string
    company: string
    status?: string
    priorityFlag?: boolean
    location?: string | null
    appliedDate?: Date | string | null
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutApplicationsInput
  }

  export type ApplicationUncheckedCreateInput = {
    id?: string
    userId: string
    title: string
    company: string
    status?: string
    priorityFlag?: boolean
    location?: string | null
    appliedDate?: Date | string | null
    createdAt?: Date | string
  }

  export type ApplicationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    company?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    priorityFlag?: BoolFieldUpdateOperationsInput | boolean
    location?: NullableStringFieldUpdateOperationsInput | string | null
    appliedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutApplicationsNestedInput
  }

  export type ApplicationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    company?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    priorityFlag?: BoolFieldUpdateOperationsInput | boolean
    location?: NullableStringFieldUpdateOperationsInput | string | null
    appliedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ApplicationCreateManyInput = {
    id?: string
    userId: string
    title: string
    company: string
    status?: string
    priorityFlag?: boolean
    location?: string | null
    appliedDate?: Date | string | null
    createdAt?: Date | string
  }

  export type ApplicationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    company?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    priorityFlag?: BoolFieldUpdateOperationsInput | boolean
    location?: NullableStringFieldUpdateOperationsInput | string | null
    appliedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ApplicationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    company?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    priorityFlag?: BoolFieldUpdateOperationsInput | boolean
    location?: NullableStringFieldUpdateOperationsInput | string | null
    appliedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CareerRoadmapCreateInput = {
    id?: string
    title: string
    duration?: number
    skillLevel?: string
    createdAt?: Date | string
    checkedTasks?: JsonNullValueInput | InputJsonValue
    user: UserCreateNestedOneWithoutRoadmapsInput
    milestones?: RoadmapMilestoneCreateNestedManyWithoutRoadmapInput
  }

  export type CareerRoadmapUncheckedCreateInput = {
    id?: string
    userId: string
    title: string
    duration?: number
    skillLevel?: string
    createdAt?: Date | string
    checkedTasks?: JsonNullValueInput | InputJsonValue
    milestones?: RoadmapMilestoneUncheckedCreateNestedManyWithoutRoadmapInput
  }

  export type CareerRoadmapUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
    skillLevel?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    checkedTasks?: JsonNullValueInput | InputJsonValue
    user?: UserUpdateOneRequiredWithoutRoadmapsNestedInput
    milestones?: RoadmapMilestoneUpdateManyWithoutRoadmapNestedInput
  }

  export type CareerRoadmapUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
    skillLevel?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    checkedTasks?: JsonNullValueInput | InputJsonValue
    milestones?: RoadmapMilestoneUncheckedUpdateManyWithoutRoadmapNestedInput
  }

  export type CareerRoadmapCreateManyInput = {
    id?: string
    userId: string
    title: string
    duration?: number
    skillLevel?: string
    createdAt?: Date | string
    checkedTasks?: JsonNullValueInput | InputJsonValue
  }

  export type CareerRoadmapUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
    skillLevel?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    checkedTasks?: JsonNullValueInput | InputJsonValue
  }

  export type CareerRoadmapUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
    skillLevel?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    checkedTasks?: JsonNullValueInput | InputJsonValue
  }

  export type RoadmapMilestoneCreateInput = {
    id?: string
    monthNo: number
    title: string
    weeksData?: JsonNullValueInput | InputJsonValue
    roadmap: CareerRoadmapCreateNestedOneWithoutMilestonesInput
  }

  export type RoadmapMilestoneUncheckedCreateInput = {
    id?: string
    roadmapId: string
    monthNo: number
    title: string
    weeksData?: JsonNullValueInput | InputJsonValue
  }

  export type RoadmapMilestoneUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    monthNo?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    weeksData?: JsonNullValueInput | InputJsonValue
    roadmap?: CareerRoadmapUpdateOneRequiredWithoutMilestonesNestedInput
  }

  export type RoadmapMilestoneUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    roadmapId?: StringFieldUpdateOperationsInput | string
    monthNo?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    weeksData?: JsonNullValueInput | InputJsonValue
  }

  export type RoadmapMilestoneCreateManyInput = {
    id?: string
    roadmapId: string
    monthNo: number
    title: string
    weeksData?: JsonNullValueInput | InputJsonValue
  }

  export type RoadmapMilestoneUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    monthNo?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    weeksData?: JsonNullValueInput | InputJsonValue
  }

  export type RoadmapMilestoneUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    roadmapId?: StringFieldUpdateOperationsInput | string
    monthNo?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    weeksData?: JsonNullValueInput | InputJsonValue
  }

  export type InterviewSessionCreateInput = {
    id?: string
    roleContext: string
    overallScore?: number | null
    readinessLevel?: string | null
    strengths?: InterviewSessionCreatestrengthsInput | string[]
    improvements?: InterviewSessionCreateimprovementsInput | string[]
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutInterviewSessionsInput
    questions?: InterviewQuestionCreateNestedManyWithoutSessionInput
  }

  export type InterviewSessionUncheckedCreateInput = {
    id?: string
    userId: string
    roleContext: string
    overallScore?: number | null
    readinessLevel?: string | null
    strengths?: InterviewSessionCreatestrengthsInput | string[]
    improvements?: InterviewSessionCreateimprovementsInput | string[]
    createdAt?: Date | string
    questions?: InterviewQuestionUncheckedCreateNestedManyWithoutSessionInput
  }

  export type InterviewSessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    roleContext?: StringFieldUpdateOperationsInput | string
    overallScore?: NullableIntFieldUpdateOperationsInput | number | null
    readinessLevel?: NullableStringFieldUpdateOperationsInput | string | null
    strengths?: InterviewSessionUpdatestrengthsInput | string[]
    improvements?: InterviewSessionUpdateimprovementsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutInterviewSessionsNestedInput
    questions?: InterviewQuestionUpdateManyWithoutSessionNestedInput
  }

  export type InterviewSessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    roleContext?: StringFieldUpdateOperationsInput | string
    overallScore?: NullableIntFieldUpdateOperationsInput | number | null
    readinessLevel?: NullableStringFieldUpdateOperationsInput | string | null
    strengths?: InterviewSessionUpdatestrengthsInput | string[]
    improvements?: InterviewSessionUpdateimprovementsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    questions?: InterviewQuestionUncheckedUpdateManyWithoutSessionNestedInput
  }

  export type InterviewSessionCreateManyInput = {
    id?: string
    userId: string
    roleContext: string
    overallScore?: number | null
    readinessLevel?: string | null
    strengths?: InterviewSessionCreatestrengthsInput | string[]
    improvements?: InterviewSessionCreateimprovementsInput | string[]
    createdAt?: Date | string
  }

  export type InterviewSessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    roleContext?: StringFieldUpdateOperationsInput | string
    overallScore?: NullableIntFieldUpdateOperationsInput | number | null
    readinessLevel?: NullableStringFieldUpdateOperationsInput | string | null
    strengths?: InterviewSessionUpdatestrengthsInput | string[]
    improvements?: InterviewSessionUpdateimprovementsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InterviewSessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    roleContext?: StringFieldUpdateOperationsInput | string
    overallScore?: NullableIntFieldUpdateOperationsInput | number | null
    readinessLevel?: NullableStringFieldUpdateOperationsInput | string | null
    strengths?: InterviewSessionUpdatestrengthsInput | string[]
    improvements?: InterviewSessionUpdateimprovementsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InterviewQuestionCreateInput = {
    id?: string
    questionText: string
    answerText?: string | null
    rating?: number | null
    confidence?: string | null
    feedbackText?: string | null
    session: InterviewSessionCreateNestedOneWithoutQuestionsInput
  }

  export type InterviewQuestionUncheckedCreateInput = {
    id?: string
    sessionId: string
    questionText: string
    answerText?: string | null
    rating?: number | null
    confidence?: string | null
    feedbackText?: string | null
  }

  export type InterviewQuestionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    questionText?: StringFieldUpdateOperationsInput | string
    answerText?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: NullableIntFieldUpdateOperationsInput | number | null
    confidence?: NullableStringFieldUpdateOperationsInput | string | null
    feedbackText?: NullableStringFieldUpdateOperationsInput | string | null
    session?: InterviewSessionUpdateOneRequiredWithoutQuestionsNestedInput
  }

  export type InterviewQuestionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionId?: StringFieldUpdateOperationsInput | string
    questionText?: StringFieldUpdateOperationsInput | string
    answerText?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: NullableIntFieldUpdateOperationsInput | number | null
    confidence?: NullableStringFieldUpdateOperationsInput | string | null
    feedbackText?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type InterviewQuestionCreateManyInput = {
    id?: string
    sessionId: string
    questionText: string
    answerText?: string | null
    rating?: number | null
    confidence?: string | null
    feedbackText?: string | null
  }

  export type InterviewQuestionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    questionText?: StringFieldUpdateOperationsInput | string
    answerText?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: NullableIntFieldUpdateOperationsInput | number | null
    confidence?: NullableStringFieldUpdateOperationsInput | string | null
    feedbackText?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type InterviewQuestionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionId?: StringFieldUpdateOperationsInput | string
    questionText?: StringFieldUpdateOperationsInput | string
    answerText?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: NullableIntFieldUpdateOperationsInput | number | null
    confidence?: NullableStringFieldUpdateOperationsInput | string | null
    feedbackText?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ActionItemCreateInput = {
    id?: string
    title: string
    description: string
    priority?: string
    status?: string
    source: string
    skillGap?: string | null
    estimatedMinutes?: number
    impactText?: string | null
    tasks?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutActionItemsInput
  }

  export type ActionItemUncheckedCreateInput = {
    id?: string
    userId: string
    title: string
    description: string
    priority?: string
    status?: string
    source: string
    skillGap?: string | null
    estimatedMinutes?: number
    impactText?: string | null
    tasks?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ActionItemUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    priority?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    skillGap?: NullableStringFieldUpdateOperationsInput | string | null
    estimatedMinutes?: IntFieldUpdateOperationsInput | number
    impactText?: NullableStringFieldUpdateOperationsInput | string | null
    tasks?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutActionItemsNestedInput
  }

  export type ActionItemUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    priority?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    skillGap?: NullableStringFieldUpdateOperationsInput | string | null
    estimatedMinutes?: IntFieldUpdateOperationsInput | number
    impactText?: NullableStringFieldUpdateOperationsInput | string | null
    tasks?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActionItemCreateManyInput = {
    id?: string
    userId: string
    title: string
    description: string
    priority?: string
    status?: string
    source: string
    skillGap?: string | null
    estimatedMinutes?: number
    impactText?: string | null
    tasks?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ActionItemUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    priority?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    skillGap?: NullableStringFieldUpdateOperationsInput | string | null
    estimatedMinutes?: IntFieldUpdateOperationsInput | number
    impactText?: NullableStringFieldUpdateOperationsInput | string | null
    tasks?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActionItemUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    priority?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    skillGap?: NullableStringFieldUpdateOperationsInput | string | null
    estimatedMinutes?: IntFieldUpdateOperationsInput | number
    impactText?: NullableStringFieldUpdateOperationsInput | string | null
    tasks?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectRecommendationCreateInput = {
    id?: string
    title: string
    description: string
    techStack?: ProjectRecommendationCreatetechStackInput | string[]
    difficulty?: string
    resumeValue: string
    deliverables?: ProjectRecommendationCreatedeliverablesInput | string[]
    interviewPrep?: ProjectRecommendationCreateinterviewPrepInput | string[]
    sourceGap: string
    status?: string
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutProjectsInput
  }

  export type ProjectRecommendationUncheckedCreateInput = {
    id?: string
    userId: string
    title: string
    description: string
    techStack?: ProjectRecommendationCreatetechStackInput | string[]
    difficulty?: string
    resumeValue: string
    deliverables?: ProjectRecommendationCreatedeliverablesInput | string[]
    interviewPrep?: ProjectRecommendationCreateinterviewPrepInput | string[]
    sourceGap: string
    status?: string
    createdAt?: Date | string
  }

  export type ProjectRecommendationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    techStack?: ProjectRecommendationUpdatetechStackInput | string[]
    difficulty?: StringFieldUpdateOperationsInput | string
    resumeValue?: StringFieldUpdateOperationsInput | string
    deliverables?: ProjectRecommendationUpdatedeliverablesInput | string[]
    interviewPrep?: ProjectRecommendationUpdateinterviewPrepInput | string[]
    sourceGap?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutProjectsNestedInput
  }

  export type ProjectRecommendationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    techStack?: ProjectRecommendationUpdatetechStackInput | string[]
    difficulty?: StringFieldUpdateOperationsInput | string
    resumeValue?: StringFieldUpdateOperationsInput | string
    deliverables?: ProjectRecommendationUpdatedeliverablesInput | string[]
    interviewPrep?: ProjectRecommendationUpdateinterviewPrepInput | string[]
    sourceGap?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectRecommendationCreateManyInput = {
    id?: string
    userId: string
    title: string
    description: string
    techStack?: ProjectRecommendationCreatetechStackInput | string[]
    difficulty?: string
    resumeValue: string
    deliverables?: ProjectRecommendationCreatedeliverablesInput | string[]
    interviewPrep?: ProjectRecommendationCreateinterviewPrepInput | string[]
    sourceGap: string
    status?: string
    createdAt?: Date | string
  }

  export type ProjectRecommendationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    techStack?: ProjectRecommendationUpdatetechStackInput | string[]
    difficulty?: StringFieldUpdateOperationsInput | string
    resumeValue?: StringFieldUpdateOperationsInput | string
    deliverables?: ProjectRecommendationUpdatedeliverablesInput | string[]
    interviewPrep?: ProjectRecommendationUpdateinterviewPrepInput | string[]
    sourceGap?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectRecommendationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    techStack?: ProjectRecommendationUpdatetechStackInput | string[]
    difficulty?: StringFieldUpdateOperationsInput | string
    resumeValue?: StringFieldUpdateOperationsInput | string
    deliverables?: ProjectRecommendationUpdatedeliverablesInput | string[]
    interviewPrep?: ProjectRecommendationUpdateinterviewPrepInput | string[]
    sourceGap?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type ProfileNullableScalarRelationFilter = {
    is?: ProfileWhereInput | null
    isNot?: ProfileWhereInput | null
  }

  export type ResumeListRelationFilter = {
    every?: ResumeWhereInput
    some?: ResumeWhereInput
    none?: ResumeWhereInput
  }

  export type ApplicationListRelationFilter = {
    every?: ApplicationWhereInput
    some?: ApplicationWhereInput
    none?: ApplicationWhereInput
  }

  export type CareerRoadmapListRelationFilter = {
    every?: CareerRoadmapWhereInput
    some?: CareerRoadmapWhereInput
    none?: CareerRoadmapWhereInput
  }

  export type InterviewSessionListRelationFilter = {
    every?: InterviewSessionWhereInput
    some?: InterviewSessionWhereInput
    none?: InterviewSessionWhereInput
  }

  export type ActionItemListRelationFilter = {
    every?: ActionItemWhereInput
    some?: ActionItemWhereInput
    none?: ActionItemWhereInput
  }

  export type ProjectRecommendationListRelationFilter = {
    every?: ProjectRecommendationWhereInput
    some?: ProjectRecommendationWhereInput
    none?: ProjectRecommendationWhereInput
  }

  export type ResumeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ApplicationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CareerRoadmapOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type InterviewSessionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ActionItemOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProjectRecommendationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }
  export type JsonFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ProfileCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    fullName?: SortOrder
    targetRole?: SortOrder
    targetLevel?: SortOrder
    streakDays?: SortOrder
    dailyScore?: SortOrder
    easySolved?: SortOrder
    mediumSolved?: SortOrder
    hardSolved?: SortOrder
    targetCompany?: SortOrder
    companyType?: SortOrder
    specialization?: SortOrder
    experienceLevel?: SortOrder
    targetTimeline?: SortOrder
    timeAvailable?: SortOrder
    currentSkills?: SortOrder
    onboardingCompleted?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProfileAvgOrderByAggregateInput = {
    streakDays?: SortOrder
    dailyScore?: SortOrder
    easySolved?: SortOrder
    mediumSolved?: SortOrder
    hardSolved?: SortOrder
    targetTimeline?: SortOrder
  }

  export type ProfileMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    fullName?: SortOrder
    targetRole?: SortOrder
    targetLevel?: SortOrder
    streakDays?: SortOrder
    dailyScore?: SortOrder
    easySolved?: SortOrder
    mediumSolved?: SortOrder
    hardSolved?: SortOrder
    targetCompany?: SortOrder
    companyType?: SortOrder
    specialization?: SortOrder
    experienceLevel?: SortOrder
    targetTimeline?: SortOrder
    timeAvailable?: SortOrder
    onboardingCompleted?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProfileMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    fullName?: SortOrder
    targetRole?: SortOrder
    targetLevel?: SortOrder
    streakDays?: SortOrder
    dailyScore?: SortOrder
    easySolved?: SortOrder
    mediumSolved?: SortOrder
    hardSolved?: SortOrder
    targetCompany?: SortOrder
    companyType?: SortOrder
    specialization?: SortOrder
    experienceLevel?: SortOrder
    targetTimeline?: SortOrder
    timeAvailable?: SortOrder
    onboardingCompleted?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProfileSumOrderByAggregateInput = {
    streakDays?: SortOrder
    dailyScore?: SortOrder
    easySolved?: SortOrder
    mediumSolved?: SortOrder
    hardSolved?: SortOrder
    targetTimeline?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type ResumeVersionListRelationFilter = {
    every?: ResumeVersionWhereInput
    some?: ResumeVersionWhereInput
    none?: ResumeVersionWhereInput
  }

  export type ResumeVersionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ResumeCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    createdAt?: SortOrder
  }

  export type ResumeMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    createdAt?: SortOrder
  }

  export type ResumeMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    createdAt?: SortOrder
  }

  export type ResumeScalarRelationFilter = {
    is?: ResumeWhereInput
    isNot?: ResumeWhereInput
  }

  export type ResumeAnalysisNullableScalarRelationFilter = {
    is?: ResumeAnalysisWhereInput | null
    isNot?: ResumeAnalysisWhereInput | null
  }

  export type ResumeVersionCountOrderByAggregateInput = {
    id?: SortOrder
    resumeId?: SortOrder
    fileUrl?: SortOrder
    extractedText?: SortOrder
    versionNo?: SortOrder
    createdAt?: SortOrder
  }

  export type ResumeVersionAvgOrderByAggregateInput = {
    versionNo?: SortOrder
  }

  export type ResumeVersionMaxOrderByAggregateInput = {
    id?: SortOrder
    resumeId?: SortOrder
    fileUrl?: SortOrder
    extractedText?: SortOrder
    versionNo?: SortOrder
    createdAt?: SortOrder
  }

  export type ResumeVersionMinOrderByAggregateInput = {
    id?: SortOrder
    resumeId?: SortOrder
    fileUrl?: SortOrder
    extractedText?: SortOrder
    versionNo?: SortOrder
    createdAt?: SortOrder
  }

  export type ResumeVersionSumOrderByAggregateInput = {
    versionNo?: SortOrder
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type ResumeVersionScalarRelationFilter = {
    is?: ResumeVersionWhereInput
    isNot?: ResumeVersionWhereInput
  }

  export type ResumeAnalysisCountOrderByAggregateInput = {
    id?: SortOrder
    resumeVersionId?: SortOrder
    atsScore?: SortOrder
    compatibilityText?: SortOrder
    suggestions?: SortOrder
    missingKeywords?: SortOrder
    createdAt?: SortOrder
  }

  export type ResumeAnalysisAvgOrderByAggregateInput = {
    atsScore?: SortOrder
  }

  export type ResumeAnalysisMaxOrderByAggregateInput = {
    id?: SortOrder
    resumeVersionId?: SortOrder
    atsScore?: SortOrder
    compatibilityText?: SortOrder
    createdAt?: SortOrder
  }

  export type ResumeAnalysisMinOrderByAggregateInput = {
    id?: SortOrder
    resumeVersionId?: SortOrder
    atsScore?: SortOrder
    compatibilityText?: SortOrder
    createdAt?: SortOrder
  }

  export type ResumeAnalysisSumOrderByAggregateInput = {
    atsScore?: SortOrder
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type ApplicationCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    company?: SortOrder
    status?: SortOrder
    priorityFlag?: SortOrder
    location?: SortOrder
    appliedDate?: SortOrder
    createdAt?: SortOrder
  }

  export type ApplicationMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    company?: SortOrder
    status?: SortOrder
    priorityFlag?: SortOrder
    location?: SortOrder
    appliedDate?: SortOrder
    createdAt?: SortOrder
  }

  export type ApplicationMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    company?: SortOrder
    status?: SortOrder
    priorityFlag?: SortOrder
    location?: SortOrder
    appliedDate?: SortOrder
    createdAt?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type RoadmapMilestoneListRelationFilter = {
    every?: RoadmapMilestoneWhereInput
    some?: RoadmapMilestoneWhereInput
    none?: RoadmapMilestoneWhereInput
  }

  export type RoadmapMilestoneOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CareerRoadmapCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    duration?: SortOrder
    skillLevel?: SortOrder
    createdAt?: SortOrder
    checkedTasks?: SortOrder
  }

  export type CareerRoadmapAvgOrderByAggregateInput = {
    duration?: SortOrder
  }

  export type CareerRoadmapMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    duration?: SortOrder
    skillLevel?: SortOrder
    createdAt?: SortOrder
  }

  export type CareerRoadmapMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    duration?: SortOrder
    skillLevel?: SortOrder
    createdAt?: SortOrder
  }

  export type CareerRoadmapSumOrderByAggregateInput = {
    duration?: SortOrder
  }

  export type CareerRoadmapScalarRelationFilter = {
    is?: CareerRoadmapWhereInput
    isNot?: CareerRoadmapWhereInput
  }

  export type RoadmapMilestoneCountOrderByAggregateInput = {
    id?: SortOrder
    roadmapId?: SortOrder
    monthNo?: SortOrder
    title?: SortOrder
    weeksData?: SortOrder
  }

  export type RoadmapMilestoneAvgOrderByAggregateInput = {
    monthNo?: SortOrder
  }

  export type RoadmapMilestoneMaxOrderByAggregateInput = {
    id?: SortOrder
    roadmapId?: SortOrder
    monthNo?: SortOrder
    title?: SortOrder
  }

  export type RoadmapMilestoneMinOrderByAggregateInput = {
    id?: SortOrder
    roadmapId?: SortOrder
    monthNo?: SortOrder
    title?: SortOrder
  }

  export type RoadmapMilestoneSumOrderByAggregateInput = {
    monthNo?: SortOrder
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type InterviewQuestionListRelationFilter = {
    every?: InterviewQuestionWhereInput
    some?: InterviewQuestionWhereInput
    none?: InterviewQuestionWhereInput
  }

  export type InterviewQuestionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type InterviewSessionCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    roleContext?: SortOrder
    overallScore?: SortOrder
    readinessLevel?: SortOrder
    strengths?: SortOrder
    improvements?: SortOrder
    createdAt?: SortOrder
  }

  export type InterviewSessionAvgOrderByAggregateInput = {
    overallScore?: SortOrder
  }

  export type InterviewSessionMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    roleContext?: SortOrder
    overallScore?: SortOrder
    readinessLevel?: SortOrder
    createdAt?: SortOrder
  }

  export type InterviewSessionMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    roleContext?: SortOrder
    overallScore?: SortOrder
    readinessLevel?: SortOrder
    createdAt?: SortOrder
  }

  export type InterviewSessionSumOrderByAggregateInput = {
    overallScore?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type InterviewSessionScalarRelationFilter = {
    is?: InterviewSessionWhereInput
    isNot?: InterviewSessionWhereInput
  }

  export type InterviewQuestionCountOrderByAggregateInput = {
    id?: SortOrder
    sessionId?: SortOrder
    questionText?: SortOrder
    answerText?: SortOrder
    rating?: SortOrder
    confidence?: SortOrder
    feedbackText?: SortOrder
  }

  export type InterviewQuestionAvgOrderByAggregateInput = {
    rating?: SortOrder
  }

  export type InterviewQuestionMaxOrderByAggregateInput = {
    id?: SortOrder
    sessionId?: SortOrder
    questionText?: SortOrder
    answerText?: SortOrder
    rating?: SortOrder
    confidence?: SortOrder
    feedbackText?: SortOrder
  }

  export type InterviewQuestionMinOrderByAggregateInput = {
    id?: SortOrder
    sessionId?: SortOrder
    questionText?: SortOrder
    answerText?: SortOrder
    rating?: SortOrder
    confidence?: SortOrder
    feedbackText?: SortOrder
  }

  export type InterviewQuestionSumOrderByAggregateInput = {
    rating?: SortOrder
  }

  export type ActionItemCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    priority?: SortOrder
    status?: SortOrder
    source?: SortOrder
    skillGap?: SortOrder
    estimatedMinutes?: SortOrder
    impactText?: SortOrder
    tasks?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ActionItemAvgOrderByAggregateInput = {
    estimatedMinutes?: SortOrder
  }

  export type ActionItemMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    priority?: SortOrder
    status?: SortOrder
    source?: SortOrder
    skillGap?: SortOrder
    estimatedMinutes?: SortOrder
    impactText?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ActionItemMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    priority?: SortOrder
    status?: SortOrder
    source?: SortOrder
    skillGap?: SortOrder
    estimatedMinutes?: SortOrder
    impactText?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ActionItemSumOrderByAggregateInput = {
    estimatedMinutes?: SortOrder
  }

  export type ProjectRecommendationCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    techStack?: SortOrder
    difficulty?: SortOrder
    resumeValue?: SortOrder
    deliverables?: SortOrder
    interviewPrep?: SortOrder
    sourceGap?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type ProjectRecommendationMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    difficulty?: SortOrder
    resumeValue?: SortOrder
    sourceGap?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type ProjectRecommendationMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    difficulty?: SortOrder
    resumeValue?: SortOrder
    sourceGap?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type ProfileCreateNestedOneWithoutUserInput = {
    create?: XOR<ProfileCreateWithoutUserInput, ProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutUserInput
    connect?: ProfileWhereUniqueInput
  }

  export type ResumeCreateNestedManyWithoutUserInput = {
    create?: XOR<ResumeCreateWithoutUserInput, ResumeUncheckedCreateWithoutUserInput> | ResumeCreateWithoutUserInput[] | ResumeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ResumeCreateOrConnectWithoutUserInput | ResumeCreateOrConnectWithoutUserInput[]
    createMany?: ResumeCreateManyUserInputEnvelope
    connect?: ResumeWhereUniqueInput | ResumeWhereUniqueInput[]
  }

  export type ApplicationCreateNestedManyWithoutUserInput = {
    create?: XOR<ApplicationCreateWithoutUserInput, ApplicationUncheckedCreateWithoutUserInput> | ApplicationCreateWithoutUserInput[] | ApplicationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ApplicationCreateOrConnectWithoutUserInput | ApplicationCreateOrConnectWithoutUserInput[]
    createMany?: ApplicationCreateManyUserInputEnvelope
    connect?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[]
  }

  export type CareerRoadmapCreateNestedManyWithoutUserInput = {
    create?: XOR<CareerRoadmapCreateWithoutUserInput, CareerRoadmapUncheckedCreateWithoutUserInput> | CareerRoadmapCreateWithoutUserInput[] | CareerRoadmapUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CareerRoadmapCreateOrConnectWithoutUserInput | CareerRoadmapCreateOrConnectWithoutUserInput[]
    createMany?: CareerRoadmapCreateManyUserInputEnvelope
    connect?: CareerRoadmapWhereUniqueInput | CareerRoadmapWhereUniqueInput[]
  }

  export type InterviewSessionCreateNestedManyWithoutUserInput = {
    create?: XOR<InterviewSessionCreateWithoutUserInput, InterviewSessionUncheckedCreateWithoutUserInput> | InterviewSessionCreateWithoutUserInput[] | InterviewSessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: InterviewSessionCreateOrConnectWithoutUserInput | InterviewSessionCreateOrConnectWithoutUserInput[]
    createMany?: InterviewSessionCreateManyUserInputEnvelope
    connect?: InterviewSessionWhereUniqueInput | InterviewSessionWhereUniqueInput[]
  }

  export type ActionItemCreateNestedManyWithoutUserInput = {
    create?: XOR<ActionItemCreateWithoutUserInput, ActionItemUncheckedCreateWithoutUserInput> | ActionItemCreateWithoutUserInput[] | ActionItemUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ActionItemCreateOrConnectWithoutUserInput | ActionItemCreateOrConnectWithoutUserInput[]
    createMany?: ActionItemCreateManyUserInputEnvelope
    connect?: ActionItemWhereUniqueInput | ActionItemWhereUniqueInput[]
  }

  export type ProjectRecommendationCreateNestedManyWithoutUserInput = {
    create?: XOR<ProjectRecommendationCreateWithoutUserInput, ProjectRecommendationUncheckedCreateWithoutUserInput> | ProjectRecommendationCreateWithoutUserInput[] | ProjectRecommendationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProjectRecommendationCreateOrConnectWithoutUserInput | ProjectRecommendationCreateOrConnectWithoutUserInput[]
    createMany?: ProjectRecommendationCreateManyUserInputEnvelope
    connect?: ProjectRecommendationWhereUniqueInput | ProjectRecommendationWhereUniqueInput[]
  }

  export type ProfileUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<ProfileCreateWithoutUserInput, ProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutUserInput
    connect?: ProfileWhereUniqueInput
  }

  export type ResumeUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ResumeCreateWithoutUserInput, ResumeUncheckedCreateWithoutUserInput> | ResumeCreateWithoutUserInput[] | ResumeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ResumeCreateOrConnectWithoutUserInput | ResumeCreateOrConnectWithoutUserInput[]
    createMany?: ResumeCreateManyUserInputEnvelope
    connect?: ResumeWhereUniqueInput | ResumeWhereUniqueInput[]
  }

  export type ApplicationUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ApplicationCreateWithoutUserInput, ApplicationUncheckedCreateWithoutUserInput> | ApplicationCreateWithoutUserInput[] | ApplicationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ApplicationCreateOrConnectWithoutUserInput | ApplicationCreateOrConnectWithoutUserInput[]
    createMany?: ApplicationCreateManyUserInputEnvelope
    connect?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[]
  }

  export type CareerRoadmapUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<CareerRoadmapCreateWithoutUserInput, CareerRoadmapUncheckedCreateWithoutUserInput> | CareerRoadmapCreateWithoutUserInput[] | CareerRoadmapUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CareerRoadmapCreateOrConnectWithoutUserInput | CareerRoadmapCreateOrConnectWithoutUserInput[]
    createMany?: CareerRoadmapCreateManyUserInputEnvelope
    connect?: CareerRoadmapWhereUniqueInput | CareerRoadmapWhereUniqueInput[]
  }

  export type InterviewSessionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<InterviewSessionCreateWithoutUserInput, InterviewSessionUncheckedCreateWithoutUserInput> | InterviewSessionCreateWithoutUserInput[] | InterviewSessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: InterviewSessionCreateOrConnectWithoutUserInput | InterviewSessionCreateOrConnectWithoutUserInput[]
    createMany?: InterviewSessionCreateManyUserInputEnvelope
    connect?: InterviewSessionWhereUniqueInput | InterviewSessionWhereUniqueInput[]
  }

  export type ActionItemUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ActionItemCreateWithoutUserInput, ActionItemUncheckedCreateWithoutUserInput> | ActionItemCreateWithoutUserInput[] | ActionItemUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ActionItemCreateOrConnectWithoutUserInput | ActionItemCreateOrConnectWithoutUserInput[]
    createMany?: ActionItemCreateManyUserInputEnvelope
    connect?: ActionItemWhereUniqueInput | ActionItemWhereUniqueInput[]
  }

  export type ProjectRecommendationUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ProjectRecommendationCreateWithoutUserInput, ProjectRecommendationUncheckedCreateWithoutUserInput> | ProjectRecommendationCreateWithoutUserInput[] | ProjectRecommendationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProjectRecommendationCreateOrConnectWithoutUserInput | ProjectRecommendationCreateOrConnectWithoutUserInput[]
    createMany?: ProjectRecommendationCreateManyUserInputEnvelope
    connect?: ProjectRecommendationWhereUniqueInput | ProjectRecommendationWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type ProfileUpdateOneWithoutUserNestedInput = {
    create?: XOR<ProfileCreateWithoutUserInput, ProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutUserInput
    upsert?: ProfileUpsertWithoutUserInput
    disconnect?: ProfileWhereInput | boolean
    delete?: ProfileWhereInput | boolean
    connect?: ProfileWhereUniqueInput
    update?: XOR<XOR<ProfileUpdateToOneWithWhereWithoutUserInput, ProfileUpdateWithoutUserInput>, ProfileUncheckedUpdateWithoutUserInput>
  }

  export type ResumeUpdateManyWithoutUserNestedInput = {
    create?: XOR<ResumeCreateWithoutUserInput, ResumeUncheckedCreateWithoutUserInput> | ResumeCreateWithoutUserInput[] | ResumeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ResumeCreateOrConnectWithoutUserInput | ResumeCreateOrConnectWithoutUserInput[]
    upsert?: ResumeUpsertWithWhereUniqueWithoutUserInput | ResumeUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ResumeCreateManyUserInputEnvelope
    set?: ResumeWhereUniqueInput | ResumeWhereUniqueInput[]
    disconnect?: ResumeWhereUniqueInput | ResumeWhereUniqueInput[]
    delete?: ResumeWhereUniqueInput | ResumeWhereUniqueInput[]
    connect?: ResumeWhereUniqueInput | ResumeWhereUniqueInput[]
    update?: ResumeUpdateWithWhereUniqueWithoutUserInput | ResumeUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ResumeUpdateManyWithWhereWithoutUserInput | ResumeUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ResumeScalarWhereInput | ResumeScalarWhereInput[]
  }

  export type ApplicationUpdateManyWithoutUserNestedInput = {
    create?: XOR<ApplicationCreateWithoutUserInput, ApplicationUncheckedCreateWithoutUserInput> | ApplicationCreateWithoutUserInput[] | ApplicationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ApplicationCreateOrConnectWithoutUserInput | ApplicationCreateOrConnectWithoutUserInput[]
    upsert?: ApplicationUpsertWithWhereUniqueWithoutUserInput | ApplicationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ApplicationCreateManyUserInputEnvelope
    set?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[]
    disconnect?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[]
    delete?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[]
    connect?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[]
    update?: ApplicationUpdateWithWhereUniqueWithoutUserInput | ApplicationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ApplicationUpdateManyWithWhereWithoutUserInput | ApplicationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ApplicationScalarWhereInput | ApplicationScalarWhereInput[]
  }

  export type CareerRoadmapUpdateManyWithoutUserNestedInput = {
    create?: XOR<CareerRoadmapCreateWithoutUserInput, CareerRoadmapUncheckedCreateWithoutUserInput> | CareerRoadmapCreateWithoutUserInput[] | CareerRoadmapUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CareerRoadmapCreateOrConnectWithoutUserInput | CareerRoadmapCreateOrConnectWithoutUserInput[]
    upsert?: CareerRoadmapUpsertWithWhereUniqueWithoutUserInput | CareerRoadmapUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: CareerRoadmapCreateManyUserInputEnvelope
    set?: CareerRoadmapWhereUniqueInput | CareerRoadmapWhereUniqueInput[]
    disconnect?: CareerRoadmapWhereUniqueInput | CareerRoadmapWhereUniqueInput[]
    delete?: CareerRoadmapWhereUniqueInput | CareerRoadmapWhereUniqueInput[]
    connect?: CareerRoadmapWhereUniqueInput | CareerRoadmapWhereUniqueInput[]
    update?: CareerRoadmapUpdateWithWhereUniqueWithoutUserInput | CareerRoadmapUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: CareerRoadmapUpdateManyWithWhereWithoutUserInput | CareerRoadmapUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: CareerRoadmapScalarWhereInput | CareerRoadmapScalarWhereInput[]
  }

  export type InterviewSessionUpdateManyWithoutUserNestedInput = {
    create?: XOR<InterviewSessionCreateWithoutUserInput, InterviewSessionUncheckedCreateWithoutUserInput> | InterviewSessionCreateWithoutUserInput[] | InterviewSessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: InterviewSessionCreateOrConnectWithoutUserInput | InterviewSessionCreateOrConnectWithoutUserInput[]
    upsert?: InterviewSessionUpsertWithWhereUniqueWithoutUserInput | InterviewSessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: InterviewSessionCreateManyUserInputEnvelope
    set?: InterviewSessionWhereUniqueInput | InterviewSessionWhereUniqueInput[]
    disconnect?: InterviewSessionWhereUniqueInput | InterviewSessionWhereUniqueInput[]
    delete?: InterviewSessionWhereUniqueInput | InterviewSessionWhereUniqueInput[]
    connect?: InterviewSessionWhereUniqueInput | InterviewSessionWhereUniqueInput[]
    update?: InterviewSessionUpdateWithWhereUniqueWithoutUserInput | InterviewSessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: InterviewSessionUpdateManyWithWhereWithoutUserInput | InterviewSessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: InterviewSessionScalarWhereInput | InterviewSessionScalarWhereInput[]
  }

  export type ActionItemUpdateManyWithoutUserNestedInput = {
    create?: XOR<ActionItemCreateWithoutUserInput, ActionItemUncheckedCreateWithoutUserInput> | ActionItemCreateWithoutUserInput[] | ActionItemUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ActionItemCreateOrConnectWithoutUserInput | ActionItemCreateOrConnectWithoutUserInput[]
    upsert?: ActionItemUpsertWithWhereUniqueWithoutUserInput | ActionItemUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ActionItemCreateManyUserInputEnvelope
    set?: ActionItemWhereUniqueInput | ActionItemWhereUniqueInput[]
    disconnect?: ActionItemWhereUniqueInput | ActionItemWhereUniqueInput[]
    delete?: ActionItemWhereUniqueInput | ActionItemWhereUniqueInput[]
    connect?: ActionItemWhereUniqueInput | ActionItemWhereUniqueInput[]
    update?: ActionItemUpdateWithWhereUniqueWithoutUserInput | ActionItemUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ActionItemUpdateManyWithWhereWithoutUserInput | ActionItemUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ActionItemScalarWhereInput | ActionItemScalarWhereInput[]
  }

  export type ProjectRecommendationUpdateManyWithoutUserNestedInput = {
    create?: XOR<ProjectRecommendationCreateWithoutUserInput, ProjectRecommendationUncheckedCreateWithoutUserInput> | ProjectRecommendationCreateWithoutUserInput[] | ProjectRecommendationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProjectRecommendationCreateOrConnectWithoutUserInput | ProjectRecommendationCreateOrConnectWithoutUserInput[]
    upsert?: ProjectRecommendationUpsertWithWhereUniqueWithoutUserInput | ProjectRecommendationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ProjectRecommendationCreateManyUserInputEnvelope
    set?: ProjectRecommendationWhereUniqueInput | ProjectRecommendationWhereUniqueInput[]
    disconnect?: ProjectRecommendationWhereUniqueInput | ProjectRecommendationWhereUniqueInput[]
    delete?: ProjectRecommendationWhereUniqueInput | ProjectRecommendationWhereUniqueInput[]
    connect?: ProjectRecommendationWhereUniqueInput | ProjectRecommendationWhereUniqueInput[]
    update?: ProjectRecommendationUpdateWithWhereUniqueWithoutUserInput | ProjectRecommendationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ProjectRecommendationUpdateManyWithWhereWithoutUserInput | ProjectRecommendationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ProjectRecommendationScalarWhereInput | ProjectRecommendationScalarWhereInput[]
  }

  export type ProfileUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<ProfileCreateWithoutUserInput, ProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutUserInput
    upsert?: ProfileUpsertWithoutUserInput
    disconnect?: ProfileWhereInput | boolean
    delete?: ProfileWhereInput | boolean
    connect?: ProfileWhereUniqueInput
    update?: XOR<XOR<ProfileUpdateToOneWithWhereWithoutUserInput, ProfileUpdateWithoutUserInput>, ProfileUncheckedUpdateWithoutUserInput>
  }

  export type ResumeUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ResumeCreateWithoutUserInput, ResumeUncheckedCreateWithoutUserInput> | ResumeCreateWithoutUserInput[] | ResumeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ResumeCreateOrConnectWithoutUserInput | ResumeCreateOrConnectWithoutUserInput[]
    upsert?: ResumeUpsertWithWhereUniqueWithoutUserInput | ResumeUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ResumeCreateManyUserInputEnvelope
    set?: ResumeWhereUniqueInput | ResumeWhereUniqueInput[]
    disconnect?: ResumeWhereUniqueInput | ResumeWhereUniqueInput[]
    delete?: ResumeWhereUniqueInput | ResumeWhereUniqueInput[]
    connect?: ResumeWhereUniqueInput | ResumeWhereUniqueInput[]
    update?: ResumeUpdateWithWhereUniqueWithoutUserInput | ResumeUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ResumeUpdateManyWithWhereWithoutUserInput | ResumeUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ResumeScalarWhereInput | ResumeScalarWhereInput[]
  }

  export type ApplicationUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ApplicationCreateWithoutUserInput, ApplicationUncheckedCreateWithoutUserInput> | ApplicationCreateWithoutUserInput[] | ApplicationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ApplicationCreateOrConnectWithoutUserInput | ApplicationCreateOrConnectWithoutUserInput[]
    upsert?: ApplicationUpsertWithWhereUniqueWithoutUserInput | ApplicationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ApplicationCreateManyUserInputEnvelope
    set?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[]
    disconnect?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[]
    delete?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[]
    connect?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[]
    update?: ApplicationUpdateWithWhereUniqueWithoutUserInput | ApplicationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ApplicationUpdateManyWithWhereWithoutUserInput | ApplicationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ApplicationScalarWhereInput | ApplicationScalarWhereInput[]
  }

  export type CareerRoadmapUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<CareerRoadmapCreateWithoutUserInput, CareerRoadmapUncheckedCreateWithoutUserInput> | CareerRoadmapCreateWithoutUserInput[] | CareerRoadmapUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CareerRoadmapCreateOrConnectWithoutUserInput | CareerRoadmapCreateOrConnectWithoutUserInput[]
    upsert?: CareerRoadmapUpsertWithWhereUniqueWithoutUserInput | CareerRoadmapUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: CareerRoadmapCreateManyUserInputEnvelope
    set?: CareerRoadmapWhereUniqueInput | CareerRoadmapWhereUniqueInput[]
    disconnect?: CareerRoadmapWhereUniqueInput | CareerRoadmapWhereUniqueInput[]
    delete?: CareerRoadmapWhereUniqueInput | CareerRoadmapWhereUniqueInput[]
    connect?: CareerRoadmapWhereUniqueInput | CareerRoadmapWhereUniqueInput[]
    update?: CareerRoadmapUpdateWithWhereUniqueWithoutUserInput | CareerRoadmapUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: CareerRoadmapUpdateManyWithWhereWithoutUserInput | CareerRoadmapUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: CareerRoadmapScalarWhereInput | CareerRoadmapScalarWhereInput[]
  }

  export type InterviewSessionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<InterviewSessionCreateWithoutUserInput, InterviewSessionUncheckedCreateWithoutUserInput> | InterviewSessionCreateWithoutUserInput[] | InterviewSessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: InterviewSessionCreateOrConnectWithoutUserInput | InterviewSessionCreateOrConnectWithoutUserInput[]
    upsert?: InterviewSessionUpsertWithWhereUniqueWithoutUserInput | InterviewSessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: InterviewSessionCreateManyUserInputEnvelope
    set?: InterviewSessionWhereUniqueInput | InterviewSessionWhereUniqueInput[]
    disconnect?: InterviewSessionWhereUniqueInput | InterviewSessionWhereUniqueInput[]
    delete?: InterviewSessionWhereUniqueInput | InterviewSessionWhereUniqueInput[]
    connect?: InterviewSessionWhereUniqueInput | InterviewSessionWhereUniqueInput[]
    update?: InterviewSessionUpdateWithWhereUniqueWithoutUserInput | InterviewSessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: InterviewSessionUpdateManyWithWhereWithoutUserInput | InterviewSessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: InterviewSessionScalarWhereInput | InterviewSessionScalarWhereInput[]
  }

  export type ActionItemUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ActionItemCreateWithoutUserInput, ActionItemUncheckedCreateWithoutUserInput> | ActionItemCreateWithoutUserInput[] | ActionItemUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ActionItemCreateOrConnectWithoutUserInput | ActionItemCreateOrConnectWithoutUserInput[]
    upsert?: ActionItemUpsertWithWhereUniqueWithoutUserInput | ActionItemUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ActionItemCreateManyUserInputEnvelope
    set?: ActionItemWhereUniqueInput | ActionItemWhereUniqueInput[]
    disconnect?: ActionItemWhereUniqueInput | ActionItemWhereUniqueInput[]
    delete?: ActionItemWhereUniqueInput | ActionItemWhereUniqueInput[]
    connect?: ActionItemWhereUniqueInput | ActionItemWhereUniqueInput[]
    update?: ActionItemUpdateWithWhereUniqueWithoutUserInput | ActionItemUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ActionItemUpdateManyWithWhereWithoutUserInput | ActionItemUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ActionItemScalarWhereInput | ActionItemScalarWhereInput[]
  }

  export type ProjectRecommendationUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ProjectRecommendationCreateWithoutUserInput, ProjectRecommendationUncheckedCreateWithoutUserInput> | ProjectRecommendationCreateWithoutUserInput[] | ProjectRecommendationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProjectRecommendationCreateOrConnectWithoutUserInput | ProjectRecommendationCreateOrConnectWithoutUserInput[]
    upsert?: ProjectRecommendationUpsertWithWhereUniqueWithoutUserInput | ProjectRecommendationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ProjectRecommendationCreateManyUserInputEnvelope
    set?: ProjectRecommendationWhereUniqueInput | ProjectRecommendationWhereUniqueInput[]
    disconnect?: ProjectRecommendationWhereUniqueInput | ProjectRecommendationWhereUniqueInput[]
    delete?: ProjectRecommendationWhereUniqueInput | ProjectRecommendationWhereUniqueInput[]
    connect?: ProjectRecommendationWhereUniqueInput | ProjectRecommendationWhereUniqueInput[]
    update?: ProjectRecommendationUpdateWithWhereUniqueWithoutUserInput | ProjectRecommendationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ProjectRecommendationUpdateManyWithWhereWithoutUserInput | ProjectRecommendationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ProjectRecommendationScalarWhereInput | ProjectRecommendationScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutProfileInput = {
    create?: XOR<UserCreateWithoutProfileInput, UserUncheckedCreateWithoutProfileInput>
    connectOrCreate?: UserCreateOrConnectWithoutProfileInput
    connect?: UserWhereUniqueInput
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type UserUpdateOneRequiredWithoutProfileNestedInput = {
    create?: XOR<UserCreateWithoutProfileInput, UserUncheckedCreateWithoutProfileInput>
    connectOrCreate?: UserCreateOrConnectWithoutProfileInput
    upsert?: UserUpsertWithoutProfileInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutProfileInput, UserUpdateWithoutProfileInput>, UserUncheckedUpdateWithoutProfileInput>
  }

  export type UserCreateNestedOneWithoutResumesInput = {
    create?: XOR<UserCreateWithoutResumesInput, UserUncheckedCreateWithoutResumesInput>
    connectOrCreate?: UserCreateOrConnectWithoutResumesInput
    connect?: UserWhereUniqueInput
  }

  export type ResumeVersionCreateNestedManyWithoutResumeInput = {
    create?: XOR<ResumeVersionCreateWithoutResumeInput, ResumeVersionUncheckedCreateWithoutResumeInput> | ResumeVersionCreateWithoutResumeInput[] | ResumeVersionUncheckedCreateWithoutResumeInput[]
    connectOrCreate?: ResumeVersionCreateOrConnectWithoutResumeInput | ResumeVersionCreateOrConnectWithoutResumeInput[]
    createMany?: ResumeVersionCreateManyResumeInputEnvelope
    connect?: ResumeVersionWhereUniqueInput | ResumeVersionWhereUniqueInput[]
  }

  export type ResumeVersionUncheckedCreateNestedManyWithoutResumeInput = {
    create?: XOR<ResumeVersionCreateWithoutResumeInput, ResumeVersionUncheckedCreateWithoutResumeInput> | ResumeVersionCreateWithoutResumeInput[] | ResumeVersionUncheckedCreateWithoutResumeInput[]
    connectOrCreate?: ResumeVersionCreateOrConnectWithoutResumeInput | ResumeVersionCreateOrConnectWithoutResumeInput[]
    createMany?: ResumeVersionCreateManyResumeInputEnvelope
    connect?: ResumeVersionWhereUniqueInput | ResumeVersionWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutResumesNestedInput = {
    create?: XOR<UserCreateWithoutResumesInput, UserUncheckedCreateWithoutResumesInput>
    connectOrCreate?: UserCreateOrConnectWithoutResumesInput
    upsert?: UserUpsertWithoutResumesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutResumesInput, UserUpdateWithoutResumesInput>, UserUncheckedUpdateWithoutResumesInput>
  }

  export type ResumeVersionUpdateManyWithoutResumeNestedInput = {
    create?: XOR<ResumeVersionCreateWithoutResumeInput, ResumeVersionUncheckedCreateWithoutResumeInput> | ResumeVersionCreateWithoutResumeInput[] | ResumeVersionUncheckedCreateWithoutResumeInput[]
    connectOrCreate?: ResumeVersionCreateOrConnectWithoutResumeInput | ResumeVersionCreateOrConnectWithoutResumeInput[]
    upsert?: ResumeVersionUpsertWithWhereUniqueWithoutResumeInput | ResumeVersionUpsertWithWhereUniqueWithoutResumeInput[]
    createMany?: ResumeVersionCreateManyResumeInputEnvelope
    set?: ResumeVersionWhereUniqueInput | ResumeVersionWhereUniqueInput[]
    disconnect?: ResumeVersionWhereUniqueInput | ResumeVersionWhereUniqueInput[]
    delete?: ResumeVersionWhereUniqueInput | ResumeVersionWhereUniqueInput[]
    connect?: ResumeVersionWhereUniqueInput | ResumeVersionWhereUniqueInput[]
    update?: ResumeVersionUpdateWithWhereUniqueWithoutResumeInput | ResumeVersionUpdateWithWhereUniqueWithoutResumeInput[]
    updateMany?: ResumeVersionUpdateManyWithWhereWithoutResumeInput | ResumeVersionUpdateManyWithWhereWithoutResumeInput[]
    deleteMany?: ResumeVersionScalarWhereInput | ResumeVersionScalarWhereInput[]
  }

  export type ResumeVersionUncheckedUpdateManyWithoutResumeNestedInput = {
    create?: XOR<ResumeVersionCreateWithoutResumeInput, ResumeVersionUncheckedCreateWithoutResumeInput> | ResumeVersionCreateWithoutResumeInput[] | ResumeVersionUncheckedCreateWithoutResumeInput[]
    connectOrCreate?: ResumeVersionCreateOrConnectWithoutResumeInput | ResumeVersionCreateOrConnectWithoutResumeInput[]
    upsert?: ResumeVersionUpsertWithWhereUniqueWithoutResumeInput | ResumeVersionUpsertWithWhereUniqueWithoutResumeInput[]
    createMany?: ResumeVersionCreateManyResumeInputEnvelope
    set?: ResumeVersionWhereUniqueInput | ResumeVersionWhereUniqueInput[]
    disconnect?: ResumeVersionWhereUniqueInput | ResumeVersionWhereUniqueInput[]
    delete?: ResumeVersionWhereUniqueInput | ResumeVersionWhereUniqueInput[]
    connect?: ResumeVersionWhereUniqueInput | ResumeVersionWhereUniqueInput[]
    update?: ResumeVersionUpdateWithWhereUniqueWithoutResumeInput | ResumeVersionUpdateWithWhereUniqueWithoutResumeInput[]
    updateMany?: ResumeVersionUpdateManyWithWhereWithoutResumeInput | ResumeVersionUpdateManyWithWhereWithoutResumeInput[]
    deleteMany?: ResumeVersionScalarWhereInput | ResumeVersionScalarWhereInput[]
  }

  export type ResumeCreateNestedOneWithoutVersionsInput = {
    create?: XOR<ResumeCreateWithoutVersionsInput, ResumeUncheckedCreateWithoutVersionsInput>
    connectOrCreate?: ResumeCreateOrConnectWithoutVersionsInput
    connect?: ResumeWhereUniqueInput
  }

  export type ResumeAnalysisCreateNestedOneWithoutResumeVersionInput = {
    create?: XOR<ResumeAnalysisCreateWithoutResumeVersionInput, ResumeAnalysisUncheckedCreateWithoutResumeVersionInput>
    connectOrCreate?: ResumeAnalysisCreateOrConnectWithoutResumeVersionInput
    connect?: ResumeAnalysisWhereUniqueInput
  }

  export type ResumeAnalysisUncheckedCreateNestedOneWithoutResumeVersionInput = {
    create?: XOR<ResumeAnalysisCreateWithoutResumeVersionInput, ResumeAnalysisUncheckedCreateWithoutResumeVersionInput>
    connectOrCreate?: ResumeAnalysisCreateOrConnectWithoutResumeVersionInput
    connect?: ResumeAnalysisWhereUniqueInput
  }

  export type ResumeUpdateOneRequiredWithoutVersionsNestedInput = {
    create?: XOR<ResumeCreateWithoutVersionsInput, ResumeUncheckedCreateWithoutVersionsInput>
    connectOrCreate?: ResumeCreateOrConnectWithoutVersionsInput
    upsert?: ResumeUpsertWithoutVersionsInput
    connect?: ResumeWhereUniqueInput
    update?: XOR<XOR<ResumeUpdateToOneWithWhereWithoutVersionsInput, ResumeUpdateWithoutVersionsInput>, ResumeUncheckedUpdateWithoutVersionsInput>
  }

  export type ResumeAnalysisUpdateOneWithoutResumeVersionNestedInput = {
    create?: XOR<ResumeAnalysisCreateWithoutResumeVersionInput, ResumeAnalysisUncheckedCreateWithoutResumeVersionInput>
    connectOrCreate?: ResumeAnalysisCreateOrConnectWithoutResumeVersionInput
    upsert?: ResumeAnalysisUpsertWithoutResumeVersionInput
    disconnect?: ResumeAnalysisWhereInput | boolean
    delete?: ResumeAnalysisWhereInput | boolean
    connect?: ResumeAnalysisWhereUniqueInput
    update?: XOR<XOR<ResumeAnalysisUpdateToOneWithWhereWithoutResumeVersionInput, ResumeAnalysisUpdateWithoutResumeVersionInput>, ResumeAnalysisUncheckedUpdateWithoutResumeVersionInput>
  }

  export type ResumeAnalysisUncheckedUpdateOneWithoutResumeVersionNestedInput = {
    create?: XOR<ResumeAnalysisCreateWithoutResumeVersionInput, ResumeAnalysisUncheckedCreateWithoutResumeVersionInput>
    connectOrCreate?: ResumeAnalysisCreateOrConnectWithoutResumeVersionInput
    upsert?: ResumeAnalysisUpsertWithoutResumeVersionInput
    disconnect?: ResumeAnalysisWhereInput | boolean
    delete?: ResumeAnalysisWhereInput | boolean
    connect?: ResumeAnalysisWhereUniqueInput
    update?: XOR<XOR<ResumeAnalysisUpdateToOneWithWhereWithoutResumeVersionInput, ResumeAnalysisUpdateWithoutResumeVersionInput>, ResumeAnalysisUncheckedUpdateWithoutResumeVersionInput>
  }

  export type ResumeAnalysisCreatemissingKeywordsInput = {
    set: string[]
  }

  export type ResumeVersionCreateNestedOneWithoutAnalysisInput = {
    create?: XOR<ResumeVersionCreateWithoutAnalysisInput, ResumeVersionUncheckedCreateWithoutAnalysisInput>
    connectOrCreate?: ResumeVersionCreateOrConnectWithoutAnalysisInput
    connect?: ResumeVersionWhereUniqueInput
  }

  export type ResumeAnalysisUpdatemissingKeywordsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type ResumeVersionUpdateOneRequiredWithoutAnalysisNestedInput = {
    create?: XOR<ResumeVersionCreateWithoutAnalysisInput, ResumeVersionUncheckedCreateWithoutAnalysisInput>
    connectOrCreate?: ResumeVersionCreateOrConnectWithoutAnalysisInput
    upsert?: ResumeVersionUpsertWithoutAnalysisInput
    connect?: ResumeVersionWhereUniqueInput
    update?: XOR<XOR<ResumeVersionUpdateToOneWithWhereWithoutAnalysisInput, ResumeVersionUpdateWithoutAnalysisInput>, ResumeVersionUncheckedUpdateWithoutAnalysisInput>
  }

  export type UserCreateNestedOneWithoutApplicationsInput = {
    create?: XOR<UserCreateWithoutApplicationsInput, UserUncheckedCreateWithoutApplicationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutApplicationsInput
    connect?: UserWhereUniqueInput
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type UserUpdateOneRequiredWithoutApplicationsNestedInput = {
    create?: XOR<UserCreateWithoutApplicationsInput, UserUncheckedCreateWithoutApplicationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutApplicationsInput
    upsert?: UserUpsertWithoutApplicationsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutApplicationsInput, UserUpdateWithoutApplicationsInput>, UserUncheckedUpdateWithoutApplicationsInput>
  }

  export type UserCreateNestedOneWithoutRoadmapsInput = {
    create?: XOR<UserCreateWithoutRoadmapsInput, UserUncheckedCreateWithoutRoadmapsInput>
    connectOrCreate?: UserCreateOrConnectWithoutRoadmapsInput
    connect?: UserWhereUniqueInput
  }

  export type RoadmapMilestoneCreateNestedManyWithoutRoadmapInput = {
    create?: XOR<RoadmapMilestoneCreateWithoutRoadmapInput, RoadmapMilestoneUncheckedCreateWithoutRoadmapInput> | RoadmapMilestoneCreateWithoutRoadmapInput[] | RoadmapMilestoneUncheckedCreateWithoutRoadmapInput[]
    connectOrCreate?: RoadmapMilestoneCreateOrConnectWithoutRoadmapInput | RoadmapMilestoneCreateOrConnectWithoutRoadmapInput[]
    createMany?: RoadmapMilestoneCreateManyRoadmapInputEnvelope
    connect?: RoadmapMilestoneWhereUniqueInput | RoadmapMilestoneWhereUniqueInput[]
  }

  export type RoadmapMilestoneUncheckedCreateNestedManyWithoutRoadmapInput = {
    create?: XOR<RoadmapMilestoneCreateWithoutRoadmapInput, RoadmapMilestoneUncheckedCreateWithoutRoadmapInput> | RoadmapMilestoneCreateWithoutRoadmapInput[] | RoadmapMilestoneUncheckedCreateWithoutRoadmapInput[]
    connectOrCreate?: RoadmapMilestoneCreateOrConnectWithoutRoadmapInput | RoadmapMilestoneCreateOrConnectWithoutRoadmapInput[]
    createMany?: RoadmapMilestoneCreateManyRoadmapInputEnvelope
    connect?: RoadmapMilestoneWhereUniqueInput | RoadmapMilestoneWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutRoadmapsNestedInput = {
    create?: XOR<UserCreateWithoutRoadmapsInput, UserUncheckedCreateWithoutRoadmapsInput>
    connectOrCreate?: UserCreateOrConnectWithoutRoadmapsInput
    upsert?: UserUpsertWithoutRoadmapsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutRoadmapsInput, UserUpdateWithoutRoadmapsInput>, UserUncheckedUpdateWithoutRoadmapsInput>
  }

  export type RoadmapMilestoneUpdateManyWithoutRoadmapNestedInput = {
    create?: XOR<RoadmapMilestoneCreateWithoutRoadmapInput, RoadmapMilestoneUncheckedCreateWithoutRoadmapInput> | RoadmapMilestoneCreateWithoutRoadmapInput[] | RoadmapMilestoneUncheckedCreateWithoutRoadmapInput[]
    connectOrCreate?: RoadmapMilestoneCreateOrConnectWithoutRoadmapInput | RoadmapMilestoneCreateOrConnectWithoutRoadmapInput[]
    upsert?: RoadmapMilestoneUpsertWithWhereUniqueWithoutRoadmapInput | RoadmapMilestoneUpsertWithWhereUniqueWithoutRoadmapInput[]
    createMany?: RoadmapMilestoneCreateManyRoadmapInputEnvelope
    set?: RoadmapMilestoneWhereUniqueInput | RoadmapMilestoneWhereUniqueInput[]
    disconnect?: RoadmapMilestoneWhereUniqueInput | RoadmapMilestoneWhereUniqueInput[]
    delete?: RoadmapMilestoneWhereUniqueInput | RoadmapMilestoneWhereUniqueInput[]
    connect?: RoadmapMilestoneWhereUniqueInput | RoadmapMilestoneWhereUniqueInput[]
    update?: RoadmapMilestoneUpdateWithWhereUniqueWithoutRoadmapInput | RoadmapMilestoneUpdateWithWhereUniqueWithoutRoadmapInput[]
    updateMany?: RoadmapMilestoneUpdateManyWithWhereWithoutRoadmapInput | RoadmapMilestoneUpdateManyWithWhereWithoutRoadmapInput[]
    deleteMany?: RoadmapMilestoneScalarWhereInput | RoadmapMilestoneScalarWhereInput[]
  }

  export type RoadmapMilestoneUncheckedUpdateManyWithoutRoadmapNestedInput = {
    create?: XOR<RoadmapMilestoneCreateWithoutRoadmapInput, RoadmapMilestoneUncheckedCreateWithoutRoadmapInput> | RoadmapMilestoneCreateWithoutRoadmapInput[] | RoadmapMilestoneUncheckedCreateWithoutRoadmapInput[]
    connectOrCreate?: RoadmapMilestoneCreateOrConnectWithoutRoadmapInput | RoadmapMilestoneCreateOrConnectWithoutRoadmapInput[]
    upsert?: RoadmapMilestoneUpsertWithWhereUniqueWithoutRoadmapInput | RoadmapMilestoneUpsertWithWhereUniqueWithoutRoadmapInput[]
    createMany?: RoadmapMilestoneCreateManyRoadmapInputEnvelope
    set?: RoadmapMilestoneWhereUniqueInput | RoadmapMilestoneWhereUniqueInput[]
    disconnect?: RoadmapMilestoneWhereUniqueInput | RoadmapMilestoneWhereUniqueInput[]
    delete?: RoadmapMilestoneWhereUniqueInput | RoadmapMilestoneWhereUniqueInput[]
    connect?: RoadmapMilestoneWhereUniqueInput | RoadmapMilestoneWhereUniqueInput[]
    update?: RoadmapMilestoneUpdateWithWhereUniqueWithoutRoadmapInput | RoadmapMilestoneUpdateWithWhereUniqueWithoutRoadmapInput[]
    updateMany?: RoadmapMilestoneUpdateManyWithWhereWithoutRoadmapInput | RoadmapMilestoneUpdateManyWithWhereWithoutRoadmapInput[]
    deleteMany?: RoadmapMilestoneScalarWhereInput | RoadmapMilestoneScalarWhereInput[]
  }

  export type CareerRoadmapCreateNestedOneWithoutMilestonesInput = {
    create?: XOR<CareerRoadmapCreateWithoutMilestonesInput, CareerRoadmapUncheckedCreateWithoutMilestonesInput>
    connectOrCreate?: CareerRoadmapCreateOrConnectWithoutMilestonesInput
    connect?: CareerRoadmapWhereUniqueInput
  }

  export type CareerRoadmapUpdateOneRequiredWithoutMilestonesNestedInput = {
    create?: XOR<CareerRoadmapCreateWithoutMilestonesInput, CareerRoadmapUncheckedCreateWithoutMilestonesInput>
    connectOrCreate?: CareerRoadmapCreateOrConnectWithoutMilestonesInput
    upsert?: CareerRoadmapUpsertWithoutMilestonesInput
    connect?: CareerRoadmapWhereUniqueInput
    update?: XOR<XOR<CareerRoadmapUpdateToOneWithWhereWithoutMilestonesInput, CareerRoadmapUpdateWithoutMilestonesInput>, CareerRoadmapUncheckedUpdateWithoutMilestonesInput>
  }

  export type InterviewSessionCreatestrengthsInput = {
    set: string[]
  }

  export type InterviewSessionCreateimprovementsInput = {
    set: string[]
  }

  export type UserCreateNestedOneWithoutInterviewSessionsInput = {
    create?: XOR<UserCreateWithoutInterviewSessionsInput, UserUncheckedCreateWithoutInterviewSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutInterviewSessionsInput
    connect?: UserWhereUniqueInput
  }

  export type InterviewQuestionCreateNestedManyWithoutSessionInput = {
    create?: XOR<InterviewQuestionCreateWithoutSessionInput, InterviewQuestionUncheckedCreateWithoutSessionInput> | InterviewQuestionCreateWithoutSessionInput[] | InterviewQuestionUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: InterviewQuestionCreateOrConnectWithoutSessionInput | InterviewQuestionCreateOrConnectWithoutSessionInput[]
    createMany?: InterviewQuestionCreateManySessionInputEnvelope
    connect?: InterviewQuestionWhereUniqueInput | InterviewQuestionWhereUniqueInput[]
  }

  export type InterviewQuestionUncheckedCreateNestedManyWithoutSessionInput = {
    create?: XOR<InterviewQuestionCreateWithoutSessionInput, InterviewQuestionUncheckedCreateWithoutSessionInput> | InterviewQuestionCreateWithoutSessionInput[] | InterviewQuestionUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: InterviewQuestionCreateOrConnectWithoutSessionInput | InterviewQuestionCreateOrConnectWithoutSessionInput[]
    createMany?: InterviewQuestionCreateManySessionInputEnvelope
    connect?: InterviewQuestionWhereUniqueInput | InterviewQuestionWhereUniqueInput[]
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type InterviewSessionUpdatestrengthsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type InterviewSessionUpdateimprovementsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type UserUpdateOneRequiredWithoutInterviewSessionsNestedInput = {
    create?: XOR<UserCreateWithoutInterviewSessionsInput, UserUncheckedCreateWithoutInterviewSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutInterviewSessionsInput
    upsert?: UserUpsertWithoutInterviewSessionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutInterviewSessionsInput, UserUpdateWithoutInterviewSessionsInput>, UserUncheckedUpdateWithoutInterviewSessionsInput>
  }

  export type InterviewQuestionUpdateManyWithoutSessionNestedInput = {
    create?: XOR<InterviewQuestionCreateWithoutSessionInput, InterviewQuestionUncheckedCreateWithoutSessionInput> | InterviewQuestionCreateWithoutSessionInput[] | InterviewQuestionUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: InterviewQuestionCreateOrConnectWithoutSessionInput | InterviewQuestionCreateOrConnectWithoutSessionInput[]
    upsert?: InterviewQuestionUpsertWithWhereUniqueWithoutSessionInput | InterviewQuestionUpsertWithWhereUniqueWithoutSessionInput[]
    createMany?: InterviewQuestionCreateManySessionInputEnvelope
    set?: InterviewQuestionWhereUniqueInput | InterviewQuestionWhereUniqueInput[]
    disconnect?: InterviewQuestionWhereUniqueInput | InterviewQuestionWhereUniqueInput[]
    delete?: InterviewQuestionWhereUniqueInput | InterviewQuestionWhereUniqueInput[]
    connect?: InterviewQuestionWhereUniqueInput | InterviewQuestionWhereUniqueInput[]
    update?: InterviewQuestionUpdateWithWhereUniqueWithoutSessionInput | InterviewQuestionUpdateWithWhereUniqueWithoutSessionInput[]
    updateMany?: InterviewQuestionUpdateManyWithWhereWithoutSessionInput | InterviewQuestionUpdateManyWithWhereWithoutSessionInput[]
    deleteMany?: InterviewQuestionScalarWhereInput | InterviewQuestionScalarWhereInput[]
  }

  export type InterviewQuestionUncheckedUpdateManyWithoutSessionNestedInput = {
    create?: XOR<InterviewQuestionCreateWithoutSessionInput, InterviewQuestionUncheckedCreateWithoutSessionInput> | InterviewQuestionCreateWithoutSessionInput[] | InterviewQuestionUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: InterviewQuestionCreateOrConnectWithoutSessionInput | InterviewQuestionCreateOrConnectWithoutSessionInput[]
    upsert?: InterviewQuestionUpsertWithWhereUniqueWithoutSessionInput | InterviewQuestionUpsertWithWhereUniqueWithoutSessionInput[]
    createMany?: InterviewQuestionCreateManySessionInputEnvelope
    set?: InterviewQuestionWhereUniqueInput | InterviewQuestionWhereUniqueInput[]
    disconnect?: InterviewQuestionWhereUniqueInput | InterviewQuestionWhereUniqueInput[]
    delete?: InterviewQuestionWhereUniqueInput | InterviewQuestionWhereUniqueInput[]
    connect?: InterviewQuestionWhereUniqueInput | InterviewQuestionWhereUniqueInput[]
    update?: InterviewQuestionUpdateWithWhereUniqueWithoutSessionInput | InterviewQuestionUpdateWithWhereUniqueWithoutSessionInput[]
    updateMany?: InterviewQuestionUpdateManyWithWhereWithoutSessionInput | InterviewQuestionUpdateManyWithWhereWithoutSessionInput[]
    deleteMany?: InterviewQuestionScalarWhereInput | InterviewQuestionScalarWhereInput[]
  }

  export type InterviewSessionCreateNestedOneWithoutQuestionsInput = {
    create?: XOR<InterviewSessionCreateWithoutQuestionsInput, InterviewSessionUncheckedCreateWithoutQuestionsInput>
    connectOrCreate?: InterviewSessionCreateOrConnectWithoutQuestionsInput
    connect?: InterviewSessionWhereUniqueInput
  }

  export type InterviewSessionUpdateOneRequiredWithoutQuestionsNestedInput = {
    create?: XOR<InterviewSessionCreateWithoutQuestionsInput, InterviewSessionUncheckedCreateWithoutQuestionsInput>
    connectOrCreate?: InterviewSessionCreateOrConnectWithoutQuestionsInput
    upsert?: InterviewSessionUpsertWithoutQuestionsInput
    connect?: InterviewSessionWhereUniqueInput
    update?: XOR<XOR<InterviewSessionUpdateToOneWithWhereWithoutQuestionsInput, InterviewSessionUpdateWithoutQuestionsInput>, InterviewSessionUncheckedUpdateWithoutQuestionsInput>
  }

  export type UserCreateNestedOneWithoutActionItemsInput = {
    create?: XOR<UserCreateWithoutActionItemsInput, UserUncheckedCreateWithoutActionItemsInput>
    connectOrCreate?: UserCreateOrConnectWithoutActionItemsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutActionItemsNestedInput = {
    create?: XOR<UserCreateWithoutActionItemsInput, UserUncheckedCreateWithoutActionItemsInput>
    connectOrCreate?: UserCreateOrConnectWithoutActionItemsInput
    upsert?: UserUpsertWithoutActionItemsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutActionItemsInput, UserUpdateWithoutActionItemsInput>, UserUncheckedUpdateWithoutActionItemsInput>
  }

  export type ProjectRecommendationCreatetechStackInput = {
    set: string[]
  }

  export type ProjectRecommendationCreatedeliverablesInput = {
    set: string[]
  }

  export type ProjectRecommendationCreateinterviewPrepInput = {
    set: string[]
  }

  export type UserCreateNestedOneWithoutProjectsInput = {
    create?: XOR<UserCreateWithoutProjectsInput, UserUncheckedCreateWithoutProjectsInput>
    connectOrCreate?: UserCreateOrConnectWithoutProjectsInput
    connect?: UserWhereUniqueInput
  }

  export type ProjectRecommendationUpdatetechStackInput = {
    set?: string[]
    push?: string | string[]
  }

  export type ProjectRecommendationUpdatedeliverablesInput = {
    set?: string[]
    push?: string | string[]
  }

  export type ProjectRecommendationUpdateinterviewPrepInput = {
    set?: string[]
    push?: string | string[]
  }

  export type UserUpdateOneRequiredWithoutProjectsNestedInput = {
    create?: XOR<UserCreateWithoutProjectsInput, UserUncheckedCreateWithoutProjectsInput>
    connectOrCreate?: UserCreateOrConnectWithoutProjectsInput
    upsert?: UserUpsertWithoutProjectsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutProjectsInput, UserUpdateWithoutProjectsInput>, UserUncheckedUpdateWithoutProjectsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }
  export type NestedJsonFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type ProfileCreateWithoutUserInput = {
    id?: string
    fullName: string
    targetRole?: string | null
    targetLevel?: string | null
    streakDays?: number
    dailyScore?: number
    easySolved?: number
    mediumSolved?: number
    hardSolved?: number
    targetCompany?: string | null
    companyType?: string | null
    specialization?: string | null
    experienceLevel?: string | null
    targetTimeline?: number
    timeAvailable?: string | null
    currentSkills?: JsonNullValueInput | InputJsonValue
    onboardingCompleted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProfileUncheckedCreateWithoutUserInput = {
    id?: string
    fullName: string
    targetRole?: string | null
    targetLevel?: string | null
    streakDays?: number
    dailyScore?: number
    easySolved?: number
    mediumSolved?: number
    hardSolved?: number
    targetCompany?: string | null
    companyType?: string | null
    specialization?: string | null
    experienceLevel?: string | null
    targetTimeline?: number
    timeAvailable?: string | null
    currentSkills?: JsonNullValueInput | InputJsonValue
    onboardingCompleted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProfileCreateOrConnectWithoutUserInput = {
    where: ProfileWhereUniqueInput
    create: XOR<ProfileCreateWithoutUserInput, ProfileUncheckedCreateWithoutUserInput>
  }

  export type ResumeCreateWithoutUserInput = {
    id?: string
    title?: string
    createdAt?: Date | string
    versions?: ResumeVersionCreateNestedManyWithoutResumeInput
  }

  export type ResumeUncheckedCreateWithoutUserInput = {
    id?: string
    title?: string
    createdAt?: Date | string
    versions?: ResumeVersionUncheckedCreateNestedManyWithoutResumeInput
  }

  export type ResumeCreateOrConnectWithoutUserInput = {
    where: ResumeWhereUniqueInput
    create: XOR<ResumeCreateWithoutUserInput, ResumeUncheckedCreateWithoutUserInput>
  }

  export type ResumeCreateManyUserInputEnvelope = {
    data: ResumeCreateManyUserInput | ResumeCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ApplicationCreateWithoutUserInput = {
    id?: string
    title: string
    company: string
    status?: string
    priorityFlag?: boolean
    location?: string | null
    appliedDate?: Date | string | null
    createdAt?: Date | string
  }

  export type ApplicationUncheckedCreateWithoutUserInput = {
    id?: string
    title: string
    company: string
    status?: string
    priorityFlag?: boolean
    location?: string | null
    appliedDate?: Date | string | null
    createdAt?: Date | string
  }

  export type ApplicationCreateOrConnectWithoutUserInput = {
    where: ApplicationWhereUniqueInput
    create: XOR<ApplicationCreateWithoutUserInput, ApplicationUncheckedCreateWithoutUserInput>
  }

  export type ApplicationCreateManyUserInputEnvelope = {
    data: ApplicationCreateManyUserInput | ApplicationCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type CareerRoadmapCreateWithoutUserInput = {
    id?: string
    title: string
    duration?: number
    skillLevel?: string
    createdAt?: Date | string
    checkedTasks?: JsonNullValueInput | InputJsonValue
    milestones?: RoadmapMilestoneCreateNestedManyWithoutRoadmapInput
  }

  export type CareerRoadmapUncheckedCreateWithoutUserInput = {
    id?: string
    title: string
    duration?: number
    skillLevel?: string
    createdAt?: Date | string
    checkedTasks?: JsonNullValueInput | InputJsonValue
    milestones?: RoadmapMilestoneUncheckedCreateNestedManyWithoutRoadmapInput
  }

  export type CareerRoadmapCreateOrConnectWithoutUserInput = {
    where: CareerRoadmapWhereUniqueInput
    create: XOR<CareerRoadmapCreateWithoutUserInput, CareerRoadmapUncheckedCreateWithoutUserInput>
  }

  export type CareerRoadmapCreateManyUserInputEnvelope = {
    data: CareerRoadmapCreateManyUserInput | CareerRoadmapCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type InterviewSessionCreateWithoutUserInput = {
    id?: string
    roleContext: string
    overallScore?: number | null
    readinessLevel?: string | null
    strengths?: InterviewSessionCreatestrengthsInput | string[]
    improvements?: InterviewSessionCreateimprovementsInput | string[]
    createdAt?: Date | string
    questions?: InterviewQuestionCreateNestedManyWithoutSessionInput
  }

  export type InterviewSessionUncheckedCreateWithoutUserInput = {
    id?: string
    roleContext: string
    overallScore?: number | null
    readinessLevel?: string | null
    strengths?: InterviewSessionCreatestrengthsInput | string[]
    improvements?: InterviewSessionCreateimprovementsInput | string[]
    createdAt?: Date | string
    questions?: InterviewQuestionUncheckedCreateNestedManyWithoutSessionInput
  }

  export type InterviewSessionCreateOrConnectWithoutUserInput = {
    where: InterviewSessionWhereUniqueInput
    create: XOR<InterviewSessionCreateWithoutUserInput, InterviewSessionUncheckedCreateWithoutUserInput>
  }

  export type InterviewSessionCreateManyUserInputEnvelope = {
    data: InterviewSessionCreateManyUserInput | InterviewSessionCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ActionItemCreateWithoutUserInput = {
    id?: string
    title: string
    description: string
    priority?: string
    status?: string
    source: string
    skillGap?: string | null
    estimatedMinutes?: number
    impactText?: string | null
    tasks?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ActionItemUncheckedCreateWithoutUserInput = {
    id?: string
    title: string
    description: string
    priority?: string
    status?: string
    source: string
    skillGap?: string | null
    estimatedMinutes?: number
    impactText?: string | null
    tasks?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ActionItemCreateOrConnectWithoutUserInput = {
    where: ActionItemWhereUniqueInput
    create: XOR<ActionItemCreateWithoutUserInput, ActionItemUncheckedCreateWithoutUserInput>
  }

  export type ActionItemCreateManyUserInputEnvelope = {
    data: ActionItemCreateManyUserInput | ActionItemCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ProjectRecommendationCreateWithoutUserInput = {
    id?: string
    title: string
    description: string
    techStack?: ProjectRecommendationCreatetechStackInput | string[]
    difficulty?: string
    resumeValue: string
    deliverables?: ProjectRecommendationCreatedeliverablesInput | string[]
    interviewPrep?: ProjectRecommendationCreateinterviewPrepInput | string[]
    sourceGap: string
    status?: string
    createdAt?: Date | string
  }

  export type ProjectRecommendationUncheckedCreateWithoutUserInput = {
    id?: string
    title: string
    description: string
    techStack?: ProjectRecommendationCreatetechStackInput | string[]
    difficulty?: string
    resumeValue: string
    deliverables?: ProjectRecommendationCreatedeliverablesInput | string[]
    interviewPrep?: ProjectRecommendationCreateinterviewPrepInput | string[]
    sourceGap: string
    status?: string
    createdAt?: Date | string
  }

  export type ProjectRecommendationCreateOrConnectWithoutUserInput = {
    where: ProjectRecommendationWhereUniqueInput
    create: XOR<ProjectRecommendationCreateWithoutUserInput, ProjectRecommendationUncheckedCreateWithoutUserInput>
  }

  export type ProjectRecommendationCreateManyUserInputEnvelope = {
    data: ProjectRecommendationCreateManyUserInput | ProjectRecommendationCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ProfileUpsertWithoutUserInput = {
    update: XOR<ProfileUpdateWithoutUserInput, ProfileUncheckedUpdateWithoutUserInput>
    create: XOR<ProfileCreateWithoutUserInput, ProfileUncheckedCreateWithoutUserInput>
    where?: ProfileWhereInput
  }

  export type ProfileUpdateToOneWithWhereWithoutUserInput = {
    where?: ProfileWhereInput
    data: XOR<ProfileUpdateWithoutUserInput, ProfileUncheckedUpdateWithoutUserInput>
  }

  export type ProfileUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    targetRole?: NullableStringFieldUpdateOperationsInput | string | null
    targetLevel?: NullableStringFieldUpdateOperationsInput | string | null
    streakDays?: IntFieldUpdateOperationsInput | number
    dailyScore?: IntFieldUpdateOperationsInput | number
    easySolved?: IntFieldUpdateOperationsInput | number
    mediumSolved?: IntFieldUpdateOperationsInput | number
    hardSolved?: IntFieldUpdateOperationsInput | number
    targetCompany?: NullableStringFieldUpdateOperationsInput | string | null
    companyType?: NullableStringFieldUpdateOperationsInput | string | null
    specialization?: NullableStringFieldUpdateOperationsInput | string | null
    experienceLevel?: NullableStringFieldUpdateOperationsInput | string | null
    targetTimeline?: IntFieldUpdateOperationsInput | number
    timeAvailable?: NullableStringFieldUpdateOperationsInput | string | null
    currentSkills?: JsonNullValueInput | InputJsonValue
    onboardingCompleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProfileUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    targetRole?: NullableStringFieldUpdateOperationsInput | string | null
    targetLevel?: NullableStringFieldUpdateOperationsInput | string | null
    streakDays?: IntFieldUpdateOperationsInput | number
    dailyScore?: IntFieldUpdateOperationsInput | number
    easySolved?: IntFieldUpdateOperationsInput | number
    mediumSolved?: IntFieldUpdateOperationsInput | number
    hardSolved?: IntFieldUpdateOperationsInput | number
    targetCompany?: NullableStringFieldUpdateOperationsInput | string | null
    companyType?: NullableStringFieldUpdateOperationsInput | string | null
    specialization?: NullableStringFieldUpdateOperationsInput | string | null
    experienceLevel?: NullableStringFieldUpdateOperationsInput | string | null
    targetTimeline?: IntFieldUpdateOperationsInput | number
    timeAvailable?: NullableStringFieldUpdateOperationsInput | string | null
    currentSkills?: JsonNullValueInput | InputJsonValue
    onboardingCompleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ResumeUpsertWithWhereUniqueWithoutUserInput = {
    where: ResumeWhereUniqueInput
    update: XOR<ResumeUpdateWithoutUserInput, ResumeUncheckedUpdateWithoutUserInput>
    create: XOR<ResumeCreateWithoutUserInput, ResumeUncheckedCreateWithoutUserInput>
  }

  export type ResumeUpdateWithWhereUniqueWithoutUserInput = {
    where: ResumeWhereUniqueInput
    data: XOR<ResumeUpdateWithoutUserInput, ResumeUncheckedUpdateWithoutUserInput>
  }

  export type ResumeUpdateManyWithWhereWithoutUserInput = {
    where: ResumeScalarWhereInput
    data: XOR<ResumeUpdateManyMutationInput, ResumeUncheckedUpdateManyWithoutUserInput>
  }

  export type ResumeScalarWhereInput = {
    AND?: ResumeScalarWhereInput | ResumeScalarWhereInput[]
    OR?: ResumeScalarWhereInput[]
    NOT?: ResumeScalarWhereInput | ResumeScalarWhereInput[]
    id?: StringFilter<"Resume"> | string
    userId?: StringFilter<"Resume"> | string
    title?: StringFilter<"Resume"> | string
    createdAt?: DateTimeFilter<"Resume"> | Date | string
  }

  export type ApplicationUpsertWithWhereUniqueWithoutUserInput = {
    where: ApplicationWhereUniqueInput
    update: XOR<ApplicationUpdateWithoutUserInput, ApplicationUncheckedUpdateWithoutUserInput>
    create: XOR<ApplicationCreateWithoutUserInput, ApplicationUncheckedCreateWithoutUserInput>
  }

  export type ApplicationUpdateWithWhereUniqueWithoutUserInput = {
    where: ApplicationWhereUniqueInput
    data: XOR<ApplicationUpdateWithoutUserInput, ApplicationUncheckedUpdateWithoutUserInput>
  }

  export type ApplicationUpdateManyWithWhereWithoutUserInput = {
    where: ApplicationScalarWhereInput
    data: XOR<ApplicationUpdateManyMutationInput, ApplicationUncheckedUpdateManyWithoutUserInput>
  }

  export type ApplicationScalarWhereInput = {
    AND?: ApplicationScalarWhereInput | ApplicationScalarWhereInput[]
    OR?: ApplicationScalarWhereInput[]
    NOT?: ApplicationScalarWhereInput | ApplicationScalarWhereInput[]
    id?: StringFilter<"Application"> | string
    userId?: StringFilter<"Application"> | string
    title?: StringFilter<"Application"> | string
    company?: StringFilter<"Application"> | string
    status?: StringFilter<"Application"> | string
    priorityFlag?: BoolFilter<"Application"> | boolean
    location?: StringNullableFilter<"Application"> | string | null
    appliedDate?: DateTimeNullableFilter<"Application"> | Date | string | null
    createdAt?: DateTimeFilter<"Application"> | Date | string
  }

  export type CareerRoadmapUpsertWithWhereUniqueWithoutUserInput = {
    where: CareerRoadmapWhereUniqueInput
    update: XOR<CareerRoadmapUpdateWithoutUserInput, CareerRoadmapUncheckedUpdateWithoutUserInput>
    create: XOR<CareerRoadmapCreateWithoutUserInput, CareerRoadmapUncheckedCreateWithoutUserInput>
  }

  export type CareerRoadmapUpdateWithWhereUniqueWithoutUserInput = {
    where: CareerRoadmapWhereUniqueInput
    data: XOR<CareerRoadmapUpdateWithoutUserInput, CareerRoadmapUncheckedUpdateWithoutUserInput>
  }

  export type CareerRoadmapUpdateManyWithWhereWithoutUserInput = {
    where: CareerRoadmapScalarWhereInput
    data: XOR<CareerRoadmapUpdateManyMutationInput, CareerRoadmapUncheckedUpdateManyWithoutUserInput>
  }

  export type CareerRoadmapScalarWhereInput = {
    AND?: CareerRoadmapScalarWhereInput | CareerRoadmapScalarWhereInput[]
    OR?: CareerRoadmapScalarWhereInput[]
    NOT?: CareerRoadmapScalarWhereInput | CareerRoadmapScalarWhereInput[]
    id?: StringFilter<"CareerRoadmap"> | string
    userId?: StringFilter<"CareerRoadmap"> | string
    title?: StringFilter<"CareerRoadmap"> | string
    duration?: IntFilter<"CareerRoadmap"> | number
    skillLevel?: StringFilter<"CareerRoadmap"> | string
    createdAt?: DateTimeFilter<"CareerRoadmap"> | Date | string
    checkedTasks?: JsonFilter<"CareerRoadmap">
  }

  export type InterviewSessionUpsertWithWhereUniqueWithoutUserInput = {
    where: InterviewSessionWhereUniqueInput
    update: XOR<InterviewSessionUpdateWithoutUserInput, InterviewSessionUncheckedUpdateWithoutUserInput>
    create: XOR<InterviewSessionCreateWithoutUserInput, InterviewSessionUncheckedCreateWithoutUserInput>
  }

  export type InterviewSessionUpdateWithWhereUniqueWithoutUserInput = {
    where: InterviewSessionWhereUniqueInput
    data: XOR<InterviewSessionUpdateWithoutUserInput, InterviewSessionUncheckedUpdateWithoutUserInput>
  }

  export type InterviewSessionUpdateManyWithWhereWithoutUserInput = {
    where: InterviewSessionScalarWhereInput
    data: XOR<InterviewSessionUpdateManyMutationInput, InterviewSessionUncheckedUpdateManyWithoutUserInput>
  }

  export type InterviewSessionScalarWhereInput = {
    AND?: InterviewSessionScalarWhereInput | InterviewSessionScalarWhereInput[]
    OR?: InterviewSessionScalarWhereInput[]
    NOT?: InterviewSessionScalarWhereInput | InterviewSessionScalarWhereInput[]
    id?: StringFilter<"InterviewSession"> | string
    userId?: StringFilter<"InterviewSession"> | string
    roleContext?: StringFilter<"InterviewSession"> | string
    overallScore?: IntNullableFilter<"InterviewSession"> | number | null
    readinessLevel?: StringNullableFilter<"InterviewSession"> | string | null
    strengths?: StringNullableListFilter<"InterviewSession">
    improvements?: StringNullableListFilter<"InterviewSession">
    createdAt?: DateTimeFilter<"InterviewSession"> | Date | string
  }

  export type ActionItemUpsertWithWhereUniqueWithoutUserInput = {
    where: ActionItemWhereUniqueInput
    update: XOR<ActionItemUpdateWithoutUserInput, ActionItemUncheckedUpdateWithoutUserInput>
    create: XOR<ActionItemCreateWithoutUserInput, ActionItemUncheckedCreateWithoutUserInput>
  }

  export type ActionItemUpdateWithWhereUniqueWithoutUserInput = {
    where: ActionItemWhereUniqueInput
    data: XOR<ActionItemUpdateWithoutUserInput, ActionItemUncheckedUpdateWithoutUserInput>
  }

  export type ActionItemUpdateManyWithWhereWithoutUserInput = {
    where: ActionItemScalarWhereInput
    data: XOR<ActionItemUpdateManyMutationInput, ActionItemUncheckedUpdateManyWithoutUserInput>
  }

  export type ActionItemScalarWhereInput = {
    AND?: ActionItemScalarWhereInput | ActionItemScalarWhereInput[]
    OR?: ActionItemScalarWhereInput[]
    NOT?: ActionItemScalarWhereInput | ActionItemScalarWhereInput[]
    id?: StringFilter<"ActionItem"> | string
    userId?: StringFilter<"ActionItem"> | string
    title?: StringFilter<"ActionItem"> | string
    description?: StringFilter<"ActionItem"> | string
    priority?: StringFilter<"ActionItem"> | string
    status?: StringFilter<"ActionItem"> | string
    source?: StringFilter<"ActionItem"> | string
    skillGap?: StringNullableFilter<"ActionItem"> | string | null
    estimatedMinutes?: IntFilter<"ActionItem"> | number
    impactText?: StringNullableFilter<"ActionItem"> | string | null
    tasks?: JsonFilter<"ActionItem">
    createdAt?: DateTimeFilter<"ActionItem"> | Date | string
    updatedAt?: DateTimeFilter<"ActionItem"> | Date | string
  }

  export type ProjectRecommendationUpsertWithWhereUniqueWithoutUserInput = {
    where: ProjectRecommendationWhereUniqueInput
    update: XOR<ProjectRecommendationUpdateWithoutUserInput, ProjectRecommendationUncheckedUpdateWithoutUserInput>
    create: XOR<ProjectRecommendationCreateWithoutUserInput, ProjectRecommendationUncheckedCreateWithoutUserInput>
  }

  export type ProjectRecommendationUpdateWithWhereUniqueWithoutUserInput = {
    where: ProjectRecommendationWhereUniqueInput
    data: XOR<ProjectRecommendationUpdateWithoutUserInput, ProjectRecommendationUncheckedUpdateWithoutUserInput>
  }

  export type ProjectRecommendationUpdateManyWithWhereWithoutUserInput = {
    where: ProjectRecommendationScalarWhereInput
    data: XOR<ProjectRecommendationUpdateManyMutationInput, ProjectRecommendationUncheckedUpdateManyWithoutUserInput>
  }

  export type ProjectRecommendationScalarWhereInput = {
    AND?: ProjectRecommendationScalarWhereInput | ProjectRecommendationScalarWhereInput[]
    OR?: ProjectRecommendationScalarWhereInput[]
    NOT?: ProjectRecommendationScalarWhereInput | ProjectRecommendationScalarWhereInput[]
    id?: StringFilter<"ProjectRecommendation"> | string
    userId?: StringFilter<"ProjectRecommendation"> | string
    title?: StringFilter<"ProjectRecommendation"> | string
    description?: StringFilter<"ProjectRecommendation"> | string
    techStack?: StringNullableListFilter<"ProjectRecommendation">
    difficulty?: StringFilter<"ProjectRecommendation"> | string
    resumeValue?: StringFilter<"ProjectRecommendation"> | string
    deliverables?: StringNullableListFilter<"ProjectRecommendation">
    interviewPrep?: StringNullableListFilter<"ProjectRecommendation">
    sourceGap?: StringFilter<"ProjectRecommendation"> | string
    status?: StringFilter<"ProjectRecommendation"> | string
    createdAt?: DateTimeFilter<"ProjectRecommendation"> | Date | string
  }

  export type UserCreateWithoutProfileInput = {
    id?: string
    email: string
    passwordHash: string
    createdAt?: Date | string
    updatedAt?: Date | string
    resumes?: ResumeCreateNestedManyWithoutUserInput
    applications?: ApplicationCreateNestedManyWithoutUserInput
    roadmaps?: CareerRoadmapCreateNestedManyWithoutUserInput
    interviewSessions?: InterviewSessionCreateNestedManyWithoutUserInput
    actionItems?: ActionItemCreateNestedManyWithoutUserInput
    projects?: ProjectRecommendationCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutProfileInput = {
    id?: string
    email: string
    passwordHash: string
    createdAt?: Date | string
    updatedAt?: Date | string
    resumes?: ResumeUncheckedCreateNestedManyWithoutUserInput
    applications?: ApplicationUncheckedCreateNestedManyWithoutUserInput
    roadmaps?: CareerRoadmapUncheckedCreateNestedManyWithoutUserInput
    interviewSessions?: InterviewSessionUncheckedCreateNestedManyWithoutUserInput
    actionItems?: ActionItemUncheckedCreateNestedManyWithoutUserInput
    projects?: ProjectRecommendationUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutProfileInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutProfileInput, UserUncheckedCreateWithoutProfileInput>
  }

  export type UserUpsertWithoutProfileInput = {
    update: XOR<UserUpdateWithoutProfileInput, UserUncheckedUpdateWithoutProfileInput>
    create: XOR<UserCreateWithoutProfileInput, UserUncheckedCreateWithoutProfileInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutProfileInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutProfileInput, UserUncheckedUpdateWithoutProfileInput>
  }

  export type UserUpdateWithoutProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resumes?: ResumeUpdateManyWithoutUserNestedInput
    applications?: ApplicationUpdateManyWithoutUserNestedInput
    roadmaps?: CareerRoadmapUpdateManyWithoutUserNestedInput
    interviewSessions?: InterviewSessionUpdateManyWithoutUserNestedInput
    actionItems?: ActionItemUpdateManyWithoutUserNestedInput
    projects?: ProjectRecommendationUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resumes?: ResumeUncheckedUpdateManyWithoutUserNestedInput
    applications?: ApplicationUncheckedUpdateManyWithoutUserNestedInput
    roadmaps?: CareerRoadmapUncheckedUpdateManyWithoutUserNestedInput
    interviewSessions?: InterviewSessionUncheckedUpdateManyWithoutUserNestedInput
    actionItems?: ActionItemUncheckedUpdateManyWithoutUserNestedInput
    projects?: ProjectRecommendationUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutResumesInput = {
    id?: string
    email: string
    passwordHash: string
    createdAt?: Date | string
    updatedAt?: Date | string
    profile?: ProfileCreateNestedOneWithoutUserInput
    applications?: ApplicationCreateNestedManyWithoutUserInput
    roadmaps?: CareerRoadmapCreateNestedManyWithoutUserInput
    interviewSessions?: InterviewSessionCreateNestedManyWithoutUserInput
    actionItems?: ActionItemCreateNestedManyWithoutUserInput
    projects?: ProjectRecommendationCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutResumesInput = {
    id?: string
    email: string
    passwordHash: string
    createdAt?: Date | string
    updatedAt?: Date | string
    profile?: ProfileUncheckedCreateNestedOneWithoutUserInput
    applications?: ApplicationUncheckedCreateNestedManyWithoutUserInput
    roadmaps?: CareerRoadmapUncheckedCreateNestedManyWithoutUserInput
    interviewSessions?: InterviewSessionUncheckedCreateNestedManyWithoutUserInput
    actionItems?: ActionItemUncheckedCreateNestedManyWithoutUserInput
    projects?: ProjectRecommendationUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutResumesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutResumesInput, UserUncheckedCreateWithoutResumesInput>
  }

  export type ResumeVersionCreateWithoutResumeInput = {
    id?: string
    fileUrl: string
    extractedText: string
    versionNo?: number
    createdAt?: Date | string
    analysis?: ResumeAnalysisCreateNestedOneWithoutResumeVersionInput
  }

  export type ResumeVersionUncheckedCreateWithoutResumeInput = {
    id?: string
    fileUrl: string
    extractedText: string
    versionNo?: number
    createdAt?: Date | string
    analysis?: ResumeAnalysisUncheckedCreateNestedOneWithoutResumeVersionInput
  }

  export type ResumeVersionCreateOrConnectWithoutResumeInput = {
    where: ResumeVersionWhereUniqueInput
    create: XOR<ResumeVersionCreateWithoutResumeInput, ResumeVersionUncheckedCreateWithoutResumeInput>
  }

  export type ResumeVersionCreateManyResumeInputEnvelope = {
    data: ResumeVersionCreateManyResumeInput | ResumeVersionCreateManyResumeInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutResumesInput = {
    update: XOR<UserUpdateWithoutResumesInput, UserUncheckedUpdateWithoutResumesInput>
    create: XOR<UserCreateWithoutResumesInput, UserUncheckedCreateWithoutResumesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutResumesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutResumesInput, UserUncheckedUpdateWithoutResumesInput>
  }

  export type UserUpdateWithoutResumesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profile?: ProfileUpdateOneWithoutUserNestedInput
    applications?: ApplicationUpdateManyWithoutUserNestedInput
    roadmaps?: CareerRoadmapUpdateManyWithoutUserNestedInput
    interviewSessions?: InterviewSessionUpdateManyWithoutUserNestedInput
    actionItems?: ActionItemUpdateManyWithoutUserNestedInput
    projects?: ProjectRecommendationUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutResumesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profile?: ProfileUncheckedUpdateOneWithoutUserNestedInput
    applications?: ApplicationUncheckedUpdateManyWithoutUserNestedInput
    roadmaps?: CareerRoadmapUncheckedUpdateManyWithoutUserNestedInput
    interviewSessions?: InterviewSessionUncheckedUpdateManyWithoutUserNestedInput
    actionItems?: ActionItemUncheckedUpdateManyWithoutUserNestedInput
    projects?: ProjectRecommendationUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ResumeVersionUpsertWithWhereUniqueWithoutResumeInput = {
    where: ResumeVersionWhereUniqueInput
    update: XOR<ResumeVersionUpdateWithoutResumeInput, ResumeVersionUncheckedUpdateWithoutResumeInput>
    create: XOR<ResumeVersionCreateWithoutResumeInput, ResumeVersionUncheckedCreateWithoutResumeInput>
  }

  export type ResumeVersionUpdateWithWhereUniqueWithoutResumeInput = {
    where: ResumeVersionWhereUniqueInput
    data: XOR<ResumeVersionUpdateWithoutResumeInput, ResumeVersionUncheckedUpdateWithoutResumeInput>
  }

  export type ResumeVersionUpdateManyWithWhereWithoutResumeInput = {
    where: ResumeVersionScalarWhereInput
    data: XOR<ResumeVersionUpdateManyMutationInput, ResumeVersionUncheckedUpdateManyWithoutResumeInput>
  }

  export type ResumeVersionScalarWhereInput = {
    AND?: ResumeVersionScalarWhereInput | ResumeVersionScalarWhereInput[]
    OR?: ResumeVersionScalarWhereInput[]
    NOT?: ResumeVersionScalarWhereInput | ResumeVersionScalarWhereInput[]
    id?: StringFilter<"ResumeVersion"> | string
    resumeId?: StringFilter<"ResumeVersion"> | string
    fileUrl?: StringFilter<"ResumeVersion"> | string
    extractedText?: StringFilter<"ResumeVersion"> | string
    versionNo?: IntFilter<"ResumeVersion"> | number
    createdAt?: DateTimeFilter<"ResumeVersion"> | Date | string
  }

  export type ResumeCreateWithoutVersionsInput = {
    id?: string
    title?: string
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutResumesInput
  }

  export type ResumeUncheckedCreateWithoutVersionsInput = {
    id?: string
    userId: string
    title?: string
    createdAt?: Date | string
  }

  export type ResumeCreateOrConnectWithoutVersionsInput = {
    where: ResumeWhereUniqueInput
    create: XOR<ResumeCreateWithoutVersionsInput, ResumeUncheckedCreateWithoutVersionsInput>
  }

  export type ResumeAnalysisCreateWithoutResumeVersionInput = {
    id?: string
    atsScore: number
    compatibilityText: string
    suggestions?: JsonNullValueInput | InputJsonValue
    missingKeywords?: ResumeAnalysisCreatemissingKeywordsInput | string[]
    createdAt?: Date | string
  }

  export type ResumeAnalysisUncheckedCreateWithoutResumeVersionInput = {
    id?: string
    atsScore: number
    compatibilityText: string
    suggestions?: JsonNullValueInput | InputJsonValue
    missingKeywords?: ResumeAnalysisCreatemissingKeywordsInput | string[]
    createdAt?: Date | string
  }

  export type ResumeAnalysisCreateOrConnectWithoutResumeVersionInput = {
    where: ResumeAnalysisWhereUniqueInput
    create: XOR<ResumeAnalysisCreateWithoutResumeVersionInput, ResumeAnalysisUncheckedCreateWithoutResumeVersionInput>
  }

  export type ResumeUpsertWithoutVersionsInput = {
    update: XOR<ResumeUpdateWithoutVersionsInput, ResumeUncheckedUpdateWithoutVersionsInput>
    create: XOR<ResumeCreateWithoutVersionsInput, ResumeUncheckedCreateWithoutVersionsInput>
    where?: ResumeWhereInput
  }

  export type ResumeUpdateToOneWithWhereWithoutVersionsInput = {
    where?: ResumeWhereInput
    data: XOR<ResumeUpdateWithoutVersionsInput, ResumeUncheckedUpdateWithoutVersionsInput>
  }

  export type ResumeUpdateWithoutVersionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutResumesNestedInput
  }

  export type ResumeUncheckedUpdateWithoutVersionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ResumeAnalysisUpsertWithoutResumeVersionInput = {
    update: XOR<ResumeAnalysisUpdateWithoutResumeVersionInput, ResumeAnalysisUncheckedUpdateWithoutResumeVersionInput>
    create: XOR<ResumeAnalysisCreateWithoutResumeVersionInput, ResumeAnalysisUncheckedCreateWithoutResumeVersionInput>
    where?: ResumeAnalysisWhereInput
  }

  export type ResumeAnalysisUpdateToOneWithWhereWithoutResumeVersionInput = {
    where?: ResumeAnalysisWhereInput
    data: XOR<ResumeAnalysisUpdateWithoutResumeVersionInput, ResumeAnalysisUncheckedUpdateWithoutResumeVersionInput>
  }

  export type ResumeAnalysisUpdateWithoutResumeVersionInput = {
    id?: StringFieldUpdateOperationsInput | string
    atsScore?: IntFieldUpdateOperationsInput | number
    compatibilityText?: StringFieldUpdateOperationsInput | string
    suggestions?: JsonNullValueInput | InputJsonValue
    missingKeywords?: ResumeAnalysisUpdatemissingKeywordsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ResumeAnalysisUncheckedUpdateWithoutResumeVersionInput = {
    id?: StringFieldUpdateOperationsInput | string
    atsScore?: IntFieldUpdateOperationsInput | number
    compatibilityText?: StringFieldUpdateOperationsInput | string
    suggestions?: JsonNullValueInput | InputJsonValue
    missingKeywords?: ResumeAnalysisUpdatemissingKeywordsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ResumeVersionCreateWithoutAnalysisInput = {
    id?: string
    fileUrl: string
    extractedText: string
    versionNo?: number
    createdAt?: Date | string
    resume: ResumeCreateNestedOneWithoutVersionsInput
  }

  export type ResumeVersionUncheckedCreateWithoutAnalysisInput = {
    id?: string
    resumeId: string
    fileUrl: string
    extractedText: string
    versionNo?: number
    createdAt?: Date | string
  }

  export type ResumeVersionCreateOrConnectWithoutAnalysisInput = {
    where: ResumeVersionWhereUniqueInput
    create: XOR<ResumeVersionCreateWithoutAnalysisInput, ResumeVersionUncheckedCreateWithoutAnalysisInput>
  }

  export type ResumeVersionUpsertWithoutAnalysisInput = {
    update: XOR<ResumeVersionUpdateWithoutAnalysisInput, ResumeVersionUncheckedUpdateWithoutAnalysisInput>
    create: XOR<ResumeVersionCreateWithoutAnalysisInput, ResumeVersionUncheckedCreateWithoutAnalysisInput>
    where?: ResumeVersionWhereInput
  }

  export type ResumeVersionUpdateToOneWithWhereWithoutAnalysisInput = {
    where?: ResumeVersionWhereInput
    data: XOR<ResumeVersionUpdateWithoutAnalysisInput, ResumeVersionUncheckedUpdateWithoutAnalysisInput>
  }

  export type ResumeVersionUpdateWithoutAnalysisInput = {
    id?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    extractedText?: StringFieldUpdateOperationsInput | string
    versionNo?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resume?: ResumeUpdateOneRequiredWithoutVersionsNestedInput
  }

  export type ResumeVersionUncheckedUpdateWithoutAnalysisInput = {
    id?: StringFieldUpdateOperationsInput | string
    resumeId?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    extractedText?: StringFieldUpdateOperationsInput | string
    versionNo?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateWithoutApplicationsInput = {
    id?: string
    email: string
    passwordHash: string
    createdAt?: Date | string
    updatedAt?: Date | string
    profile?: ProfileCreateNestedOneWithoutUserInput
    resumes?: ResumeCreateNestedManyWithoutUserInput
    roadmaps?: CareerRoadmapCreateNestedManyWithoutUserInput
    interviewSessions?: InterviewSessionCreateNestedManyWithoutUserInput
    actionItems?: ActionItemCreateNestedManyWithoutUserInput
    projects?: ProjectRecommendationCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutApplicationsInput = {
    id?: string
    email: string
    passwordHash: string
    createdAt?: Date | string
    updatedAt?: Date | string
    profile?: ProfileUncheckedCreateNestedOneWithoutUserInput
    resumes?: ResumeUncheckedCreateNestedManyWithoutUserInput
    roadmaps?: CareerRoadmapUncheckedCreateNestedManyWithoutUserInput
    interviewSessions?: InterviewSessionUncheckedCreateNestedManyWithoutUserInput
    actionItems?: ActionItemUncheckedCreateNestedManyWithoutUserInput
    projects?: ProjectRecommendationUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutApplicationsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutApplicationsInput, UserUncheckedCreateWithoutApplicationsInput>
  }

  export type UserUpsertWithoutApplicationsInput = {
    update: XOR<UserUpdateWithoutApplicationsInput, UserUncheckedUpdateWithoutApplicationsInput>
    create: XOR<UserCreateWithoutApplicationsInput, UserUncheckedCreateWithoutApplicationsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutApplicationsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutApplicationsInput, UserUncheckedUpdateWithoutApplicationsInput>
  }

  export type UserUpdateWithoutApplicationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profile?: ProfileUpdateOneWithoutUserNestedInput
    resumes?: ResumeUpdateManyWithoutUserNestedInput
    roadmaps?: CareerRoadmapUpdateManyWithoutUserNestedInput
    interviewSessions?: InterviewSessionUpdateManyWithoutUserNestedInput
    actionItems?: ActionItemUpdateManyWithoutUserNestedInput
    projects?: ProjectRecommendationUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutApplicationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profile?: ProfileUncheckedUpdateOneWithoutUserNestedInput
    resumes?: ResumeUncheckedUpdateManyWithoutUserNestedInput
    roadmaps?: CareerRoadmapUncheckedUpdateManyWithoutUserNestedInput
    interviewSessions?: InterviewSessionUncheckedUpdateManyWithoutUserNestedInput
    actionItems?: ActionItemUncheckedUpdateManyWithoutUserNestedInput
    projects?: ProjectRecommendationUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutRoadmapsInput = {
    id?: string
    email: string
    passwordHash: string
    createdAt?: Date | string
    updatedAt?: Date | string
    profile?: ProfileCreateNestedOneWithoutUserInput
    resumes?: ResumeCreateNestedManyWithoutUserInput
    applications?: ApplicationCreateNestedManyWithoutUserInput
    interviewSessions?: InterviewSessionCreateNestedManyWithoutUserInput
    actionItems?: ActionItemCreateNestedManyWithoutUserInput
    projects?: ProjectRecommendationCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutRoadmapsInput = {
    id?: string
    email: string
    passwordHash: string
    createdAt?: Date | string
    updatedAt?: Date | string
    profile?: ProfileUncheckedCreateNestedOneWithoutUserInput
    resumes?: ResumeUncheckedCreateNestedManyWithoutUserInput
    applications?: ApplicationUncheckedCreateNestedManyWithoutUserInput
    interviewSessions?: InterviewSessionUncheckedCreateNestedManyWithoutUserInput
    actionItems?: ActionItemUncheckedCreateNestedManyWithoutUserInput
    projects?: ProjectRecommendationUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutRoadmapsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutRoadmapsInput, UserUncheckedCreateWithoutRoadmapsInput>
  }

  export type RoadmapMilestoneCreateWithoutRoadmapInput = {
    id?: string
    monthNo: number
    title: string
    weeksData?: JsonNullValueInput | InputJsonValue
  }

  export type RoadmapMilestoneUncheckedCreateWithoutRoadmapInput = {
    id?: string
    monthNo: number
    title: string
    weeksData?: JsonNullValueInput | InputJsonValue
  }

  export type RoadmapMilestoneCreateOrConnectWithoutRoadmapInput = {
    where: RoadmapMilestoneWhereUniqueInput
    create: XOR<RoadmapMilestoneCreateWithoutRoadmapInput, RoadmapMilestoneUncheckedCreateWithoutRoadmapInput>
  }

  export type RoadmapMilestoneCreateManyRoadmapInputEnvelope = {
    data: RoadmapMilestoneCreateManyRoadmapInput | RoadmapMilestoneCreateManyRoadmapInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutRoadmapsInput = {
    update: XOR<UserUpdateWithoutRoadmapsInput, UserUncheckedUpdateWithoutRoadmapsInput>
    create: XOR<UserCreateWithoutRoadmapsInput, UserUncheckedCreateWithoutRoadmapsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutRoadmapsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutRoadmapsInput, UserUncheckedUpdateWithoutRoadmapsInput>
  }

  export type UserUpdateWithoutRoadmapsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profile?: ProfileUpdateOneWithoutUserNestedInput
    resumes?: ResumeUpdateManyWithoutUserNestedInput
    applications?: ApplicationUpdateManyWithoutUserNestedInput
    interviewSessions?: InterviewSessionUpdateManyWithoutUserNestedInput
    actionItems?: ActionItemUpdateManyWithoutUserNestedInput
    projects?: ProjectRecommendationUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutRoadmapsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profile?: ProfileUncheckedUpdateOneWithoutUserNestedInput
    resumes?: ResumeUncheckedUpdateManyWithoutUserNestedInput
    applications?: ApplicationUncheckedUpdateManyWithoutUserNestedInput
    interviewSessions?: InterviewSessionUncheckedUpdateManyWithoutUserNestedInput
    actionItems?: ActionItemUncheckedUpdateManyWithoutUserNestedInput
    projects?: ProjectRecommendationUncheckedUpdateManyWithoutUserNestedInput
  }

  export type RoadmapMilestoneUpsertWithWhereUniqueWithoutRoadmapInput = {
    where: RoadmapMilestoneWhereUniqueInput
    update: XOR<RoadmapMilestoneUpdateWithoutRoadmapInput, RoadmapMilestoneUncheckedUpdateWithoutRoadmapInput>
    create: XOR<RoadmapMilestoneCreateWithoutRoadmapInput, RoadmapMilestoneUncheckedCreateWithoutRoadmapInput>
  }

  export type RoadmapMilestoneUpdateWithWhereUniqueWithoutRoadmapInput = {
    where: RoadmapMilestoneWhereUniqueInput
    data: XOR<RoadmapMilestoneUpdateWithoutRoadmapInput, RoadmapMilestoneUncheckedUpdateWithoutRoadmapInput>
  }

  export type RoadmapMilestoneUpdateManyWithWhereWithoutRoadmapInput = {
    where: RoadmapMilestoneScalarWhereInput
    data: XOR<RoadmapMilestoneUpdateManyMutationInput, RoadmapMilestoneUncheckedUpdateManyWithoutRoadmapInput>
  }

  export type RoadmapMilestoneScalarWhereInput = {
    AND?: RoadmapMilestoneScalarWhereInput | RoadmapMilestoneScalarWhereInput[]
    OR?: RoadmapMilestoneScalarWhereInput[]
    NOT?: RoadmapMilestoneScalarWhereInput | RoadmapMilestoneScalarWhereInput[]
    id?: StringFilter<"RoadmapMilestone"> | string
    roadmapId?: StringFilter<"RoadmapMilestone"> | string
    monthNo?: IntFilter<"RoadmapMilestone"> | number
    title?: StringFilter<"RoadmapMilestone"> | string
    weeksData?: JsonFilter<"RoadmapMilestone">
  }

  export type CareerRoadmapCreateWithoutMilestonesInput = {
    id?: string
    title: string
    duration?: number
    skillLevel?: string
    createdAt?: Date | string
    checkedTasks?: JsonNullValueInput | InputJsonValue
    user: UserCreateNestedOneWithoutRoadmapsInput
  }

  export type CareerRoadmapUncheckedCreateWithoutMilestonesInput = {
    id?: string
    userId: string
    title: string
    duration?: number
    skillLevel?: string
    createdAt?: Date | string
    checkedTasks?: JsonNullValueInput | InputJsonValue
  }

  export type CareerRoadmapCreateOrConnectWithoutMilestonesInput = {
    where: CareerRoadmapWhereUniqueInput
    create: XOR<CareerRoadmapCreateWithoutMilestonesInput, CareerRoadmapUncheckedCreateWithoutMilestonesInput>
  }

  export type CareerRoadmapUpsertWithoutMilestonesInput = {
    update: XOR<CareerRoadmapUpdateWithoutMilestonesInput, CareerRoadmapUncheckedUpdateWithoutMilestonesInput>
    create: XOR<CareerRoadmapCreateWithoutMilestonesInput, CareerRoadmapUncheckedCreateWithoutMilestonesInput>
    where?: CareerRoadmapWhereInput
  }

  export type CareerRoadmapUpdateToOneWithWhereWithoutMilestonesInput = {
    where?: CareerRoadmapWhereInput
    data: XOR<CareerRoadmapUpdateWithoutMilestonesInput, CareerRoadmapUncheckedUpdateWithoutMilestonesInput>
  }

  export type CareerRoadmapUpdateWithoutMilestonesInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
    skillLevel?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    checkedTasks?: JsonNullValueInput | InputJsonValue
    user?: UserUpdateOneRequiredWithoutRoadmapsNestedInput
  }

  export type CareerRoadmapUncheckedUpdateWithoutMilestonesInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
    skillLevel?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    checkedTasks?: JsonNullValueInput | InputJsonValue
  }

  export type UserCreateWithoutInterviewSessionsInput = {
    id?: string
    email: string
    passwordHash: string
    createdAt?: Date | string
    updatedAt?: Date | string
    profile?: ProfileCreateNestedOneWithoutUserInput
    resumes?: ResumeCreateNestedManyWithoutUserInput
    applications?: ApplicationCreateNestedManyWithoutUserInput
    roadmaps?: CareerRoadmapCreateNestedManyWithoutUserInput
    actionItems?: ActionItemCreateNestedManyWithoutUserInput
    projects?: ProjectRecommendationCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutInterviewSessionsInput = {
    id?: string
    email: string
    passwordHash: string
    createdAt?: Date | string
    updatedAt?: Date | string
    profile?: ProfileUncheckedCreateNestedOneWithoutUserInput
    resumes?: ResumeUncheckedCreateNestedManyWithoutUserInput
    applications?: ApplicationUncheckedCreateNestedManyWithoutUserInput
    roadmaps?: CareerRoadmapUncheckedCreateNestedManyWithoutUserInput
    actionItems?: ActionItemUncheckedCreateNestedManyWithoutUserInput
    projects?: ProjectRecommendationUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutInterviewSessionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutInterviewSessionsInput, UserUncheckedCreateWithoutInterviewSessionsInput>
  }

  export type InterviewQuestionCreateWithoutSessionInput = {
    id?: string
    questionText: string
    answerText?: string | null
    rating?: number | null
    confidence?: string | null
    feedbackText?: string | null
  }

  export type InterviewQuestionUncheckedCreateWithoutSessionInput = {
    id?: string
    questionText: string
    answerText?: string | null
    rating?: number | null
    confidence?: string | null
    feedbackText?: string | null
  }

  export type InterviewQuestionCreateOrConnectWithoutSessionInput = {
    where: InterviewQuestionWhereUniqueInput
    create: XOR<InterviewQuestionCreateWithoutSessionInput, InterviewQuestionUncheckedCreateWithoutSessionInput>
  }

  export type InterviewQuestionCreateManySessionInputEnvelope = {
    data: InterviewQuestionCreateManySessionInput | InterviewQuestionCreateManySessionInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutInterviewSessionsInput = {
    update: XOR<UserUpdateWithoutInterviewSessionsInput, UserUncheckedUpdateWithoutInterviewSessionsInput>
    create: XOR<UserCreateWithoutInterviewSessionsInput, UserUncheckedCreateWithoutInterviewSessionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutInterviewSessionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutInterviewSessionsInput, UserUncheckedUpdateWithoutInterviewSessionsInput>
  }

  export type UserUpdateWithoutInterviewSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profile?: ProfileUpdateOneWithoutUserNestedInput
    resumes?: ResumeUpdateManyWithoutUserNestedInput
    applications?: ApplicationUpdateManyWithoutUserNestedInput
    roadmaps?: CareerRoadmapUpdateManyWithoutUserNestedInput
    actionItems?: ActionItemUpdateManyWithoutUserNestedInput
    projects?: ProjectRecommendationUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutInterviewSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profile?: ProfileUncheckedUpdateOneWithoutUserNestedInput
    resumes?: ResumeUncheckedUpdateManyWithoutUserNestedInput
    applications?: ApplicationUncheckedUpdateManyWithoutUserNestedInput
    roadmaps?: CareerRoadmapUncheckedUpdateManyWithoutUserNestedInput
    actionItems?: ActionItemUncheckedUpdateManyWithoutUserNestedInput
    projects?: ProjectRecommendationUncheckedUpdateManyWithoutUserNestedInput
  }

  export type InterviewQuestionUpsertWithWhereUniqueWithoutSessionInput = {
    where: InterviewQuestionWhereUniqueInput
    update: XOR<InterviewQuestionUpdateWithoutSessionInput, InterviewQuestionUncheckedUpdateWithoutSessionInput>
    create: XOR<InterviewQuestionCreateWithoutSessionInput, InterviewQuestionUncheckedCreateWithoutSessionInput>
  }

  export type InterviewQuestionUpdateWithWhereUniqueWithoutSessionInput = {
    where: InterviewQuestionWhereUniqueInput
    data: XOR<InterviewQuestionUpdateWithoutSessionInput, InterviewQuestionUncheckedUpdateWithoutSessionInput>
  }

  export type InterviewQuestionUpdateManyWithWhereWithoutSessionInput = {
    where: InterviewQuestionScalarWhereInput
    data: XOR<InterviewQuestionUpdateManyMutationInput, InterviewQuestionUncheckedUpdateManyWithoutSessionInput>
  }

  export type InterviewQuestionScalarWhereInput = {
    AND?: InterviewQuestionScalarWhereInput | InterviewQuestionScalarWhereInput[]
    OR?: InterviewQuestionScalarWhereInput[]
    NOT?: InterviewQuestionScalarWhereInput | InterviewQuestionScalarWhereInput[]
    id?: StringFilter<"InterviewQuestion"> | string
    sessionId?: StringFilter<"InterviewQuestion"> | string
    questionText?: StringFilter<"InterviewQuestion"> | string
    answerText?: StringNullableFilter<"InterviewQuestion"> | string | null
    rating?: IntNullableFilter<"InterviewQuestion"> | number | null
    confidence?: StringNullableFilter<"InterviewQuestion"> | string | null
    feedbackText?: StringNullableFilter<"InterviewQuestion"> | string | null
  }

  export type InterviewSessionCreateWithoutQuestionsInput = {
    id?: string
    roleContext: string
    overallScore?: number | null
    readinessLevel?: string | null
    strengths?: InterviewSessionCreatestrengthsInput | string[]
    improvements?: InterviewSessionCreateimprovementsInput | string[]
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutInterviewSessionsInput
  }

  export type InterviewSessionUncheckedCreateWithoutQuestionsInput = {
    id?: string
    userId: string
    roleContext: string
    overallScore?: number | null
    readinessLevel?: string | null
    strengths?: InterviewSessionCreatestrengthsInput | string[]
    improvements?: InterviewSessionCreateimprovementsInput | string[]
    createdAt?: Date | string
  }

  export type InterviewSessionCreateOrConnectWithoutQuestionsInput = {
    where: InterviewSessionWhereUniqueInput
    create: XOR<InterviewSessionCreateWithoutQuestionsInput, InterviewSessionUncheckedCreateWithoutQuestionsInput>
  }

  export type InterviewSessionUpsertWithoutQuestionsInput = {
    update: XOR<InterviewSessionUpdateWithoutQuestionsInput, InterviewSessionUncheckedUpdateWithoutQuestionsInput>
    create: XOR<InterviewSessionCreateWithoutQuestionsInput, InterviewSessionUncheckedCreateWithoutQuestionsInput>
    where?: InterviewSessionWhereInput
  }

  export type InterviewSessionUpdateToOneWithWhereWithoutQuestionsInput = {
    where?: InterviewSessionWhereInput
    data: XOR<InterviewSessionUpdateWithoutQuestionsInput, InterviewSessionUncheckedUpdateWithoutQuestionsInput>
  }

  export type InterviewSessionUpdateWithoutQuestionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    roleContext?: StringFieldUpdateOperationsInput | string
    overallScore?: NullableIntFieldUpdateOperationsInput | number | null
    readinessLevel?: NullableStringFieldUpdateOperationsInput | string | null
    strengths?: InterviewSessionUpdatestrengthsInput | string[]
    improvements?: InterviewSessionUpdateimprovementsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutInterviewSessionsNestedInput
  }

  export type InterviewSessionUncheckedUpdateWithoutQuestionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    roleContext?: StringFieldUpdateOperationsInput | string
    overallScore?: NullableIntFieldUpdateOperationsInput | number | null
    readinessLevel?: NullableStringFieldUpdateOperationsInput | string | null
    strengths?: InterviewSessionUpdatestrengthsInput | string[]
    improvements?: InterviewSessionUpdateimprovementsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateWithoutActionItemsInput = {
    id?: string
    email: string
    passwordHash: string
    createdAt?: Date | string
    updatedAt?: Date | string
    profile?: ProfileCreateNestedOneWithoutUserInput
    resumes?: ResumeCreateNestedManyWithoutUserInput
    applications?: ApplicationCreateNestedManyWithoutUserInput
    roadmaps?: CareerRoadmapCreateNestedManyWithoutUserInput
    interviewSessions?: InterviewSessionCreateNestedManyWithoutUserInput
    projects?: ProjectRecommendationCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutActionItemsInput = {
    id?: string
    email: string
    passwordHash: string
    createdAt?: Date | string
    updatedAt?: Date | string
    profile?: ProfileUncheckedCreateNestedOneWithoutUserInput
    resumes?: ResumeUncheckedCreateNestedManyWithoutUserInput
    applications?: ApplicationUncheckedCreateNestedManyWithoutUserInput
    roadmaps?: CareerRoadmapUncheckedCreateNestedManyWithoutUserInput
    interviewSessions?: InterviewSessionUncheckedCreateNestedManyWithoutUserInput
    projects?: ProjectRecommendationUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutActionItemsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutActionItemsInput, UserUncheckedCreateWithoutActionItemsInput>
  }

  export type UserUpsertWithoutActionItemsInput = {
    update: XOR<UserUpdateWithoutActionItemsInput, UserUncheckedUpdateWithoutActionItemsInput>
    create: XOR<UserCreateWithoutActionItemsInput, UserUncheckedCreateWithoutActionItemsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutActionItemsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutActionItemsInput, UserUncheckedUpdateWithoutActionItemsInput>
  }

  export type UserUpdateWithoutActionItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profile?: ProfileUpdateOneWithoutUserNestedInput
    resumes?: ResumeUpdateManyWithoutUserNestedInput
    applications?: ApplicationUpdateManyWithoutUserNestedInput
    roadmaps?: CareerRoadmapUpdateManyWithoutUserNestedInput
    interviewSessions?: InterviewSessionUpdateManyWithoutUserNestedInput
    projects?: ProjectRecommendationUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutActionItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profile?: ProfileUncheckedUpdateOneWithoutUserNestedInput
    resumes?: ResumeUncheckedUpdateManyWithoutUserNestedInput
    applications?: ApplicationUncheckedUpdateManyWithoutUserNestedInput
    roadmaps?: CareerRoadmapUncheckedUpdateManyWithoutUserNestedInput
    interviewSessions?: InterviewSessionUncheckedUpdateManyWithoutUserNestedInput
    projects?: ProjectRecommendationUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutProjectsInput = {
    id?: string
    email: string
    passwordHash: string
    createdAt?: Date | string
    updatedAt?: Date | string
    profile?: ProfileCreateNestedOneWithoutUserInput
    resumes?: ResumeCreateNestedManyWithoutUserInput
    applications?: ApplicationCreateNestedManyWithoutUserInput
    roadmaps?: CareerRoadmapCreateNestedManyWithoutUserInput
    interviewSessions?: InterviewSessionCreateNestedManyWithoutUserInput
    actionItems?: ActionItemCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutProjectsInput = {
    id?: string
    email: string
    passwordHash: string
    createdAt?: Date | string
    updatedAt?: Date | string
    profile?: ProfileUncheckedCreateNestedOneWithoutUserInput
    resumes?: ResumeUncheckedCreateNestedManyWithoutUserInput
    applications?: ApplicationUncheckedCreateNestedManyWithoutUserInput
    roadmaps?: CareerRoadmapUncheckedCreateNestedManyWithoutUserInput
    interviewSessions?: InterviewSessionUncheckedCreateNestedManyWithoutUserInput
    actionItems?: ActionItemUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutProjectsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutProjectsInput, UserUncheckedCreateWithoutProjectsInput>
  }

  export type UserUpsertWithoutProjectsInput = {
    update: XOR<UserUpdateWithoutProjectsInput, UserUncheckedUpdateWithoutProjectsInput>
    create: XOR<UserCreateWithoutProjectsInput, UserUncheckedCreateWithoutProjectsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutProjectsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutProjectsInput, UserUncheckedUpdateWithoutProjectsInput>
  }

  export type UserUpdateWithoutProjectsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profile?: ProfileUpdateOneWithoutUserNestedInput
    resumes?: ResumeUpdateManyWithoutUserNestedInput
    applications?: ApplicationUpdateManyWithoutUserNestedInput
    roadmaps?: CareerRoadmapUpdateManyWithoutUserNestedInput
    interviewSessions?: InterviewSessionUpdateManyWithoutUserNestedInput
    actionItems?: ActionItemUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutProjectsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profile?: ProfileUncheckedUpdateOneWithoutUserNestedInput
    resumes?: ResumeUncheckedUpdateManyWithoutUserNestedInput
    applications?: ApplicationUncheckedUpdateManyWithoutUserNestedInput
    roadmaps?: CareerRoadmapUncheckedUpdateManyWithoutUserNestedInput
    interviewSessions?: InterviewSessionUncheckedUpdateManyWithoutUserNestedInput
    actionItems?: ActionItemUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ResumeCreateManyUserInput = {
    id?: string
    title?: string
    createdAt?: Date | string
  }

  export type ApplicationCreateManyUserInput = {
    id?: string
    title: string
    company: string
    status?: string
    priorityFlag?: boolean
    location?: string | null
    appliedDate?: Date | string | null
    createdAt?: Date | string
  }

  export type CareerRoadmapCreateManyUserInput = {
    id?: string
    title: string
    duration?: number
    skillLevel?: string
    createdAt?: Date | string
    checkedTasks?: JsonNullValueInput | InputJsonValue
  }

  export type InterviewSessionCreateManyUserInput = {
    id?: string
    roleContext: string
    overallScore?: number | null
    readinessLevel?: string | null
    strengths?: InterviewSessionCreatestrengthsInput | string[]
    improvements?: InterviewSessionCreateimprovementsInput | string[]
    createdAt?: Date | string
  }

  export type ActionItemCreateManyUserInput = {
    id?: string
    title: string
    description: string
    priority?: string
    status?: string
    source: string
    skillGap?: string | null
    estimatedMinutes?: number
    impactText?: string | null
    tasks?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProjectRecommendationCreateManyUserInput = {
    id?: string
    title: string
    description: string
    techStack?: ProjectRecommendationCreatetechStackInput | string[]
    difficulty?: string
    resumeValue: string
    deliverables?: ProjectRecommendationCreatedeliverablesInput | string[]
    interviewPrep?: ProjectRecommendationCreateinterviewPrepInput | string[]
    sourceGap: string
    status?: string
    createdAt?: Date | string
  }

  export type ResumeUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    versions?: ResumeVersionUpdateManyWithoutResumeNestedInput
  }

  export type ResumeUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    versions?: ResumeVersionUncheckedUpdateManyWithoutResumeNestedInput
  }

  export type ResumeUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ApplicationUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    company?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    priorityFlag?: BoolFieldUpdateOperationsInput | boolean
    location?: NullableStringFieldUpdateOperationsInput | string | null
    appliedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ApplicationUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    company?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    priorityFlag?: BoolFieldUpdateOperationsInput | boolean
    location?: NullableStringFieldUpdateOperationsInput | string | null
    appliedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ApplicationUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    company?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    priorityFlag?: BoolFieldUpdateOperationsInput | boolean
    location?: NullableStringFieldUpdateOperationsInput | string | null
    appliedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CareerRoadmapUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
    skillLevel?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    checkedTasks?: JsonNullValueInput | InputJsonValue
    milestones?: RoadmapMilestoneUpdateManyWithoutRoadmapNestedInput
  }

  export type CareerRoadmapUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
    skillLevel?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    checkedTasks?: JsonNullValueInput | InputJsonValue
    milestones?: RoadmapMilestoneUncheckedUpdateManyWithoutRoadmapNestedInput
  }

  export type CareerRoadmapUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
    skillLevel?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    checkedTasks?: JsonNullValueInput | InputJsonValue
  }

  export type InterviewSessionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    roleContext?: StringFieldUpdateOperationsInput | string
    overallScore?: NullableIntFieldUpdateOperationsInput | number | null
    readinessLevel?: NullableStringFieldUpdateOperationsInput | string | null
    strengths?: InterviewSessionUpdatestrengthsInput | string[]
    improvements?: InterviewSessionUpdateimprovementsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    questions?: InterviewQuestionUpdateManyWithoutSessionNestedInput
  }

  export type InterviewSessionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    roleContext?: StringFieldUpdateOperationsInput | string
    overallScore?: NullableIntFieldUpdateOperationsInput | number | null
    readinessLevel?: NullableStringFieldUpdateOperationsInput | string | null
    strengths?: InterviewSessionUpdatestrengthsInput | string[]
    improvements?: InterviewSessionUpdateimprovementsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    questions?: InterviewQuestionUncheckedUpdateManyWithoutSessionNestedInput
  }

  export type InterviewSessionUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    roleContext?: StringFieldUpdateOperationsInput | string
    overallScore?: NullableIntFieldUpdateOperationsInput | number | null
    readinessLevel?: NullableStringFieldUpdateOperationsInput | string | null
    strengths?: InterviewSessionUpdatestrengthsInput | string[]
    improvements?: InterviewSessionUpdateimprovementsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActionItemUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    priority?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    skillGap?: NullableStringFieldUpdateOperationsInput | string | null
    estimatedMinutes?: IntFieldUpdateOperationsInput | number
    impactText?: NullableStringFieldUpdateOperationsInput | string | null
    tasks?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActionItemUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    priority?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    skillGap?: NullableStringFieldUpdateOperationsInput | string | null
    estimatedMinutes?: IntFieldUpdateOperationsInput | number
    impactText?: NullableStringFieldUpdateOperationsInput | string | null
    tasks?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActionItemUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    priority?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    skillGap?: NullableStringFieldUpdateOperationsInput | string | null
    estimatedMinutes?: IntFieldUpdateOperationsInput | number
    impactText?: NullableStringFieldUpdateOperationsInput | string | null
    tasks?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectRecommendationUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    techStack?: ProjectRecommendationUpdatetechStackInput | string[]
    difficulty?: StringFieldUpdateOperationsInput | string
    resumeValue?: StringFieldUpdateOperationsInput | string
    deliverables?: ProjectRecommendationUpdatedeliverablesInput | string[]
    interviewPrep?: ProjectRecommendationUpdateinterviewPrepInput | string[]
    sourceGap?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectRecommendationUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    techStack?: ProjectRecommendationUpdatetechStackInput | string[]
    difficulty?: StringFieldUpdateOperationsInput | string
    resumeValue?: StringFieldUpdateOperationsInput | string
    deliverables?: ProjectRecommendationUpdatedeliverablesInput | string[]
    interviewPrep?: ProjectRecommendationUpdateinterviewPrepInput | string[]
    sourceGap?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectRecommendationUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    techStack?: ProjectRecommendationUpdatetechStackInput | string[]
    difficulty?: StringFieldUpdateOperationsInput | string
    resumeValue?: StringFieldUpdateOperationsInput | string
    deliverables?: ProjectRecommendationUpdatedeliverablesInput | string[]
    interviewPrep?: ProjectRecommendationUpdateinterviewPrepInput | string[]
    sourceGap?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ResumeVersionCreateManyResumeInput = {
    id?: string
    fileUrl: string
    extractedText: string
    versionNo?: number
    createdAt?: Date | string
  }

  export type ResumeVersionUpdateWithoutResumeInput = {
    id?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    extractedText?: StringFieldUpdateOperationsInput | string
    versionNo?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    analysis?: ResumeAnalysisUpdateOneWithoutResumeVersionNestedInput
  }

  export type ResumeVersionUncheckedUpdateWithoutResumeInput = {
    id?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    extractedText?: StringFieldUpdateOperationsInput | string
    versionNo?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    analysis?: ResumeAnalysisUncheckedUpdateOneWithoutResumeVersionNestedInput
  }

  export type ResumeVersionUncheckedUpdateManyWithoutResumeInput = {
    id?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    extractedText?: StringFieldUpdateOperationsInput | string
    versionNo?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoadmapMilestoneCreateManyRoadmapInput = {
    id?: string
    monthNo: number
    title: string
    weeksData?: JsonNullValueInput | InputJsonValue
  }

  export type RoadmapMilestoneUpdateWithoutRoadmapInput = {
    id?: StringFieldUpdateOperationsInput | string
    monthNo?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    weeksData?: JsonNullValueInput | InputJsonValue
  }

  export type RoadmapMilestoneUncheckedUpdateWithoutRoadmapInput = {
    id?: StringFieldUpdateOperationsInput | string
    monthNo?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    weeksData?: JsonNullValueInput | InputJsonValue
  }

  export type RoadmapMilestoneUncheckedUpdateManyWithoutRoadmapInput = {
    id?: StringFieldUpdateOperationsInput | string
    monthNo?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    weeksData?: JsonNullValueInput | InputJsonValue
  }

  export type InterviewQuestionCreateManySessionInput = {
    id?: string
    questionText: string
    answerText?: string | null
    rating?: number | null
    confidence?: string | null
    feedbackText?: string | null
  }

  export type InterviewQuestionUpdateWithoutSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    questionText?: StringFieldUpdateOperationsInput | string
    answerText?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: NullableIntFieldUpdateOperationsInput | number | null
    confidence?: NullableStringFieldUpdateOperationsInput | string | null
    feedbackText?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type InterviewQuestionUncheckedUpdateWithoutSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    questionText?: StringFieldUpdateOperationsInput | string
    answerText?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: NullableIntFieldUpdateOperationsInput | number | null
    confidence?: NullableStringFieldUpdateOperationsInput | string | null
    feedbackText?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type InterviewQuestionUncheckedUpdateManyWithoutSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    questionText?: StringFieldUpdateOperationsInput | string
    answerText?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: NullableIntFieldUpdateOperationsInput | number | null
    confidence?: NullableStringFieldUpdateOperationsInput | string | null
    feedbackText?: NullableStringFieldUpdateOperationsInput | string | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}