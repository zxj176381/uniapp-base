declare type ShowActionSheetListIF = (string | Record<string, any>)[];
declare interface ShowActionSheetOptionsString<T> extends Omit<UniApp.ShowActionSheetOptions, "itemList" | "success"> {
  /**
   * 	按钮的信息数组，数组长度最大为 6
   */
  actionList: T;
  /**
   * 成功的返回值
   * @param options
   * @param options.info 选中的信息
   * @param options.index 选中的索引
   */
  callback: (options: ShowActionSheetSuccessOptions<T>) => void;
}
declare type ShowActionSheetOptionsObject<T> = ShowActionSheetOptionsString<T> & {
  keyName: keyof ArrayItemType<T>;
};
declare type ShowActionSheetOptions<T> = T extends string[]
  ? ShowActionSheetOptionsString<T>
  : ShowActionSheetOptionsObject<T>;
declare interface ShowActionSheetSuccessOptions<T> {
  info: ArrayItemType<T>;
  index: number;
}
