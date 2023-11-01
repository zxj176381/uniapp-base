/**
 * 获取数组中项的类型
 */
declare type ArrayItemType<T extends any[]> = T extends (infer U)[] ? U : never;
declare type PageStatus = "success" | "loading" | "error" | "serviceError" | "empty";
declare type ImageMode =
  | "scaleToFill"
  | "aspectFit"
  | "aspectFill"
  | "widthFix"
  | "heightFix"
  | "top"
  | "bottom"
  | "center"
  | "left"
  | "right"
  | "top left"
  | "top right"
  | "bottom left"
  | "bottom right";
declare type DicCodeIF =
  | "voucher_use_rule"
  | "transfer_voucher_agreement"
  | "points_transfer_agreement"
  | "app_introduce"
  | "privacy_agreement"
  | "service_agreement"
  | "points_agreement"
  | "coin_agreement"
  | "mizige_red_big"
  | "mizige_red_small"
  | "user_service_agreement"
  | "activity_home_picture"
  | "activity_list_1"
  | "activity_list_2";
declare interface VideoButtonEvent {
  type: string;
  sourceType: string;
  media: string;
}
