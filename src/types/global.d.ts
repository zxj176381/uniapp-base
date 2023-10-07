/**
 * 获取数组中项的类型
 */
declare type ArrayItemType<T extends any[]> = T extends (infer U)[] ? U : never;
