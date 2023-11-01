export declare global {
  declare interface TokenInfo {
    expireTime: number;
    login: boolean;
    token: string;
  }
  declare interface QuietLoginResult {
    errorMessage: string;
    openid: string;
    sessionKey: string;
    token: TokenInfo;
    unionid: string;
  }
  declare interface QuietLoginData {
    appId: string;
    code: string;
    allianceKey?: string;
    inviteType?: string;
  }

  declare type VipTypeNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
  declare type VIP_TYPE_MAP = "ordinary" | "month" | "halfYear" | "year" | "day" | "week" | "halfMonth" | "perpetual";

  declare interface UserInfoResult {
    address: string;
    areaCode: string;
    areaName: string;
    backgroundPicture: string;
    birthday: string;
    bonusPoint: number;
    briefIntroduce: string;
    brushVipFlag: boolean;
    createTime: string;
    delFlag: boolean;
    delTime: string;
    fansQuantity: number;
    followQuantity: number;
    fontVipFlag: boolean;
    idCardNo: string;
    improveFlag: boolean;
    newFlag: boolean;
    openid: string;
    payCardFlag: boolean;
    phone: string;
    professionType: 1 | 2 | 3;
    qrcodeUrl: string;
    realName: string;
    schoolId: number;
    schoolName: string;
    sex: 0 | 1 | 2;
    status: boolean;
    thumbsQuantity: number;
    token: TokenInfo;
    userCode: string;
    userId: number;
    userName: string;
    userPortrait: string;
    vip: boolean;
    vipEndDate: string;
    vipStartDate: string;
    vipType: VipTypeNumber;
    writingVipFlag: boolean;
  }

  declare interface UserPropertyResult {
    bonusPoint: number;
    coinGrade: number;
    coinGradeName: string;
    coinQuantity: number;
    coinTotal: number;
    pointsTotal: number;
    practiceQuantity: number;
    userGrade: number;
    userId: number;
    vipDays: number;
    vipGrade: number;
    voucherQuantity: number;
    couponQuantity: number;
  }

  declare interface MemberPriceResult {
    dailyCost: number;
    iosDailyCost: number;
    iosOriginalPrice: number;
    iosPrice: number;
    limitType: number;
    moduleBonus: number;
    moduleName: string;
    modulePrice: number;
    modulePriceId: number;
    modulePrivilege: string;
    moduleTip: string;
    moduleType: string;
    originalPrice: number;
    pointsQuantity: number;
    showFlag: boolean;
    timeLimit: number;
    couponList?: MemberInCouponResult[];
  }

  declare interface MemberInCouponResult {
    couponId: number;
    couponMoney: number;
    couponName: string;
    couponQuantity: number;
    minOrderMoney: number;
  }

  declare interface VoucherDetail {
    expireTime: string;
    moduleName: string;
    modulePriceId: number;
    moduleType: number;
    moduleTypeName: string;
    payedTime: string;
    sourceDistributorId: number;
    sourceUserId: number;
    timeName: string;
    timeQuantity: number;
    timeType: number;
    transferDistributorId: number;
    transferTime: string;
    transferUserId: number;
    transferUserMobile: string;
    transferUserName: string;
    usedFlag: number;
    userId: number;
    userVoucherId: number;
    voucherId: number;
    voucherMoney: number;
    voucherType: number;
  }

  declare interface PayMemberMoneyDetailResult {
    bonusDto: PayMemberIntegralIF;
    lastPrice: number;
    moduleBonus: number;
    userVoucher: VoucherDetail | null;
    voucherList: VoucherDetail[];
  }

  declare interface PayMemberData {
    modulePriceId: number;
    useFlag: boolean;
    openid: string;
    allianceKey?: string;
    inviteType?: string;
  }

  declare interface PayMemberResult {
    orderId: number;
    orderMoney: number;
    orderNo: string;
    orderStatus: number;
    payMoney: number;
    thridOrder: WechatMiniprogram.RequestPaymentOption & { packageValue: string };
  }

  declare interface MemberPayStatusResult {
    createTime: string;
    moduleBonus: number;
    modulePriceId: number;
    orderId: number;
    orderMoney: number;
    orderNo: string;
    orderStatus: number;
    orderTitle: string;
    orderType: number;
    payMoney: number;
    payedType: number;
    useBonusPoint: number;
    useBonusPointFlag: boolean;
    useFlag: boolean;
    userId: number;
    userVoucherId: string;
  }
}
