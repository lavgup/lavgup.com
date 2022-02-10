import { QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints';

export type PostResult = QueryDatabaseResponse['results'][number];
export type PropertyValueMap = PostResult['properties'];
export type PropertyValue = PropertyValueMap[string];

export type PropertyValueType = PropertyValue['type'];

export type ExtractedPropertyValue<TType extends PropertyValueType> = Extract<
    PropertyValue,
    { type: TType }
>;

export const capitalise = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1);
