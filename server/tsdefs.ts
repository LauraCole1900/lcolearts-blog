import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Auth = {
  __typename?: 'Auth';
  token: Scalars['ID']['output'];
  user?: Maybe<User>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addUser?: Maybe<Auth>;
  createEntry?: Maybe<Post>;
  createSong?: Maybe<Song>;
  deleteEntry?: Maybe<Post>;
  deleteSong?: Maybe<Song>;
  editEntry?: Maybe<Post>;
  editSong?: Maybe<Song>;
  login?: Maybe<Auth>;
};


export type MutationAddUserArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  userName: Scalars['String']['input'];
};


export type MutationCreateEntryArgs = {
  postBody: Scalars['String']['input'];
  postKeywords?: InputMaybe<Array<Scalars['String']['input']>>;
  postTitle: Scalars['String']['input'];
};


export type MutationCreateSongArgs = {
  songAccompaniment: Scalars['String']['input'];
  songLiturgy?: InputMaybe<Scalars['String']['input']>;
  songMajorWork?: InputMaybe<Scalars['Boolean']['input']>;
  songMvmtNames?: InputMaybe<Array<Scalars['String']['input']>>;
  songMvmtPreviews?: InputMaybe<Array<Scalars['String']['input']>>;
  songMvmtTracks?: InputMaybe<Array<Scalars['String']['input']>>;
  songNotes?: InputMaybe<Scalars['String']['input']>;
  songOtherVerId?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  songOtherVerName?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  songPreview?: InputMaybe<Scalars['String']['input']>;
  songSacred: Scalars['Boolean']['input'];
  songTitle: Scalars['String']['input'];
  songTrack?: InputMaybe<Scalars['String']['input']>;
  songVideo?: InputMaybe<Scalars['String']['input']>;
  songVoicing: Scalars['String']['input'];
  songYear?: InputMaybe<Scalars['String']['input']>;
};


export type MutationDeleteEntryArgs = {
  _id: Scalars['ID']['input'];
};


export type MutationDeleteSongArgs = {
  _id: Scalars['ID']['input'];
};


export type MutationEditEntryArgs = {
  _id: Scalars['ID']['input'];
  postBody: Scalars['String']['input'];
  postKeywords?: InputMaybe<Array<Scalars['String']['input']>>;
  postTitle: Scalars['String']['input'];
};


export type MutationEditSongArgs = {
  _id: Scalars['ID']['input'];
  songAccompaniment: Scalars['String']['input'];
  songLiturgy?: InputMaybe<Scalars['String']['input']>;
  songMajorWork?: InputMaybe<Scalars['Boolean']['input']>;
  songMvmtNames?: InputMaybe<Array<Scalars['String']['input']>>;
  songMvmtPreviews?: InputMaybe<Array<Scalars['String']['input']>>;
  songMvmtTracks?: InputMaybe<Array<Scalars['String']['input']>>;
  songNotes?: InputMaybe<Scalars['String']['input']>;
  songOtherVerId?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  songOtherVerName?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  songPreview?: InputMaybe<Scalars['String']['input']>;
  songSacred: Scalars['Boolean']['input'];
  songTitle: Scalars['String']['input'];
  songTrack?: InputMaybe<Scalars['String']['input']>;
  songVideo?: InputMaybe<Scalars['String']['input']>;
  songVoicing: Scalars['String']['input'];
  songYear?: InputMaybe<Scalars['String']['input']>;
};


export type MutationLoginArgs = {
  password: Scalars['String']['input'];
  userName: Scalars['String']['input'];
};

export type Post = {
  __typename?: 'Post';
  _id: Scalars['ID']['output'];
  postBody: Scalars['String']['output'];
  postDate?: Maybe<Scalars['String']['output']>;
  postKeywords?: Maybe<Array<Scalars['String']['output']>>;
  postTitle: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  getAllEntries?: Maybe<Array<Maybe<Post>>>;
  getAllSongs?: Maybe<Array<Maybe<Song>>>;
  getEntry?: Maybe<Post>;
  getSong?: Maybe<Song>;
  getSongsByAcc?: Maybe<Array<Maybe<Song>>>;
  getSongsByLiturgy?: Maybe<Array<Maybe<Song>>>;
  getSongsByMajorWork?: Maybe<Array<Maybe<Song>>>;
  getSongsBySacred?: Maybe<Array<Maybe<Song>>>;
  getSongsByTitle?: Maybe<Array<Maybe<Song>>>;
  getSongsByVoicing?: Maybe<Array<Maybe<Song>>>;
  me?: Maybe<User>;
};


export type QueryGetEntryArgs = {
  _id: Scalars['ID']['input'];
};


export type QueryGetSongArgs = {
  _id: Scalars['ID']['input'];
};


export type QueryGetSongsByAccArgs = {
  songAccompaniment: Scalars['String']['input'];
};


export type QueryGetSongsByLiturgyArgs = {
  songLiturgy: Scalars['String']['input'];
};


export type QueryGetSongsByMajorWorkArgs = {
  songMajorWork?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryGetSongsBySacredArgs = {
  songSacred: Scalars['Boolean']['input'];
};


export type QueryGetSongsByTitleArgs = {
  songTitle: Scalars['String']['input'];
};


export type QueryGetSongsByVoicingArgs = {
  songVoicing: Scalars['String']['input'];
};

export type Song = {
  __typename?: 'Song';
  _id: Scalars['ID']['output'];
  songAccompaniment: Scalars['String']['output'];
  songLiturgy?: Maybe<Scalars['String']['output']>;
  songMajorWork?: Maybe<Scalars['Boolean']['output']>;
  songMvmtNames?: Maybe<Array<Scalars['String']['output']>>;
  songMvmtPreviews?: Maybe<Array<Scalars['String']['output']>>;
  songMvmtTracks?: Maybe<Array<Scalars['String']['output']>>;
  songNotes?: Maybe<Scalars['String']['output']>;
  songOtherVerId?: Maybe<Array<Maybe<Scalars['ID']['output']>>>;
  songOtherVerName?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  songPreview?: Maybe<Scalars['String']['output']>;
  songSacred: Scalars['Boolean']['output'];
  songTitle: Scalars['String']['output'];
  songTrack?: Maybe<Scalars['String']['output']>;
  songVideo?: Maybe<Scalars['String']['output']>;
  songVoicing: Scalars['String']['output'];
  songYear?: Maybe<Scalars['String']['output']>;
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ID']['output'];
  email?: Maybe<Scalars['String']['output']>;
  password: Scalars['String']['output'];
  userName: Scalars['String']['output'];
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Auth: ResolverTypeWrapper<Auth>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  Post: ResolverTypeWrapper<Post>;
  Query: ResolverTypeWrapper<{}>;
  Song: ResolverTypeWrapper<Song>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  User: ResolverTypeWrapper<User>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Auth: Auth;
  Boolean: Scalars['Boolean']['output'];
  ID: Scalars['ID']['output'];
  Mutation: {};
  Post: Post;
  Query: {};
  Song: Song;
  String: Scalars['String']['output'];
  User: User;
}>;

export type AuthResolvers<ContextType = any, ParentType extends ResolversParentTypes['Auth'] = ResolversParentTypes['Auth']> = ResolversObject<{
  token?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  addUser?: Resolver<Maybe<ResolversTypes['Auth']>, ParentType, ContextType, RequireFields<MutationAddUserArgs, 'email' | 'password' | 'userName'>>;
  createEntry?: Resolver<Maybe<ResolversTypes['Post']>, ParentType, ContextType, RequireFields<MutationCreateEntryArgs, 'postBody' | 'postTitle'>>;
  createSong?: Resolver<Maybe<ResolversTypes['Song']>, ParentType, ContextType, RequireFields<MutationCreateSongArgs, 'songAccompaniment' | 'songSacred' | 'songTitle' | 'songVoicing'>>;
  deleteEntry?: Resolver<Maybe<ResolversTypes['Post']>, ParentType, ContextType, RequireFields<MutationDeleteEntryArgs, '_id'>>;
  deleteSong?: Resolver<Maybe<ResolversTypes['Song']>, ParentType, ContextType, RequireFields<MutationDeleteSongArgs, '_id'>>;
  editEntry?: Resolver<Maybe<ResolversTypes['Post']>, ParentType, ContextType, RequireFields<MutationEditEntryArgs, '_id' | 'postBody' | 'postTitle'>>;
  editSong?: Resolver<Maybe<ResolversTypes['Song']>, ParentType, ContextType, RequireFields<MutationEditSongArgs, '_id' | 'songAccompaniment' | 'songSacred' | 'songTitle' | 'songVoicing'>>;
  login?: Resolver<Maybe<ResolversTypes['Auth']>, ParentType, ContextType, RequireFields<MutationLoginArgs, 'password' | 'userName'>>;
}>;

export type PostResolvers<ContextType = any, ParentType extends ResolversParentTypes['Post'] = ResolversParentTypes['Post']> = ResolversObject<{
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  postBody?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  postDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  postKeywords?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  postTitle?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  getAllEntries?: Resolver<Maybe<Array<Maybe<ResolversTypes['Post']>>>, ParentType, ContextType>;
  getAllSongs?: Resolver<Maybe<Array<Maybe<ResolversTypes['Song']>>>, ParentType, ContextType>;
  getEntry?: Resolver<Maybe<ResolversTypes['Post']>, ParentType, ContextType, RequireFields<QueryGetEntryArgs, '_id'>>;
  getSong?: Resolver<Maybe<ResolversTypes['Song']>, ParentType, ContextType, RequireFields<QueryGetSongArgs, '_id'>>;
  getSongsByAcc?: Resolver<Maybe<Array<Maybe<ResolversTypes['Song']>>>, ParentType, ContextType, RequireFields<QueryGetSongsByAccArgs, 'songAccompaniment'>>;
  getSongsByLiturgy?: Resolver<Maybe<Array<Maybe<ResolversTypes['Song']>>>, ParentType, ContextType, RequireFields<QueryGetSongsByLiturgyArgs, 'songLiturgy'>>;
  getSongsByMajorWork?: Resolver<Maybe<Array<Maybe<ResolversTypes['Song']>>>, ParentType, ContextType, Partial<QueryGetSongsByMajorWorkArgs>>;
  getSongsBySacred?: Resolver<Maybe<Array<Maybe<ResolversTypes['Song']>>>, ParentType, ContextType, RequireFields<QueryGetSongsBySacredArgs, 'songSacred'>>;
  getSongsByTitle?: Resolver<Maybe<Array<Maybe<ResolversTypes['Song']>>>, ParentType, ContextType, RequireFields<QueryGetSongsByTitleArgs, 'songTitle'>>;
  getSongsByVoicing?: Resolver<Maybe<Array<Maybe<ResolversTypes['Song']>>>, ParentType, ContextType, RequireFields<QueryGetSongsByVoicingArgs, 'songVoicing'>>;
  me?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
}>;

export type SongResolvers<ContextType = any, ParentType extends ResolversParentTypes['Song'] = ResolversParentTypes['Song']> = ResolversObject<{
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  songAccompaniment?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  songLiturgy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  songMajorWork?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  songMvmtNames?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  songMvmtPreviews?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  songMvmtTracks?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  songNotes?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  songOtherVerId?: Resolver<Maybe<Array<Maybe<ResolversTypes['ID']>>>, ParentType, ContextType>;
  songOtherVerName?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  songPreview?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  songSacred?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  songTitle?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  songTrack?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  songVideo?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  songVoicing?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  songYear?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  password?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  userName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  Auth?: AuthResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Post?: PostResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Song?: SongResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
}>;

