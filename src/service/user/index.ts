import { serializeUrl } from "@/utils";
import request from "../request";

/**
 * 获取基础 token
 */
export const getBaseTokenService: Service<TokenInfo> = () => {
  return request({
    path: "/common/getToken",
    withToken: false
  });
};

/**
 * 微信小程序静默登录
 */
export const quietLoginService: Service<QuietLoginResult, QuietLoginData> = (data) => {
  return request({
    path: "/weixin/ma/login",
    data
  });
};

/**
 * 更新 token
 */
export const updateLoginTokenService: Service<TokenInfo> = () => {
  return request({
    path: "/common/updateToken"
  });
};

/**
 * 获取用户信息
 */
export const getUserInfoService: Service<UserInfoResult, { appid: string }> = (data) => {
  return request({
    path: "/user/my/info/detail",
    data
  });
};

/**
 * 获取金币和积分数量以及等级
 */
export const getUserPropertyService: Service<UserPropertyResult, object, Pick<UserInfoResult, "userId">> = (
  data,
  query
) => {
  return request({
    path: "/user/signpoints/level",
    query,
    method: "POST"
  });
};

/**
 * 获取会员购买列表
 */
export const getMemberPriceListService: Service<MemberPriceResult[]> = () => {
  return request({
    path: "/user/single/price/list?moduleType=123"
  });
};

/**
 * 获取对应会员赠送的优惠券列表
 */
export const getMemberInCouponService: Service<MemberInCouponResult[], Pick<MemberPriceResult, "modulePriceId">> = (
  data
) => {
  return request({
    path: "/market/vip/moduleCoupon",
    data
  });
};

/**
 * 查询购买会员下单明细
 */
export const getPayMemberMoneyDetailService: Service<
  PayMemberMoneyDetailResult,
  Pick<MemberPriceResult, "modulePriceId"> & { useFlag: boolean }
> = (data) => {
  return request({
    path: "/user/voucher/queryMoneyDetail",
    data: {
      ...data,
      payedType: 1,
      useBonusPointFlag: false
    }
  });
};

/**
 * 购买VIP套餐
 */
export const payMemberService: Service<PayMemberResult, PayMemberData> = (data) => {
  return request({
    path: "/user/vip/add",
    method: "POST",
    data: {
      ...data,
      payedType: 1,
      useBonusPointFlag: false
    },
    showDialog: true
  });
};

/**
 * 查询VIP订单状态
 */
export const inquirePayMemberStatusService: Service<MemberPayStatusResult, Pick<PayMemberResult, "orderId">> = (
  data
) => {
  return request({
    path: "/user/vip/queryorder",
    data
  });
};

/**
 * 绑定手机号
 */
export const wechatBindPhoneService: Service<boolean, { code: string }> = (data) => {
  return request({
    path: "/weixin/changephone",
    data,
    showDialog: true
  });
};
