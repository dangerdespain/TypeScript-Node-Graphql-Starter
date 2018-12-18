'use strict'

module.exports = {

  defaults : {
    stripe: () => ({
      publishable_key : "pk_test_K02TRhLf3VPtx71Erw5JWXHv",
      secret_key : "sk_test_W4P53zCCggOurKZPbRGrbJtF",
      webhook_secret : 'whsec_5Sm1fgNZcmeKilVauSYVpPBre1gppgAG',
      livemode : false,
      product : {
        credits : 'prod_CUc2OkB1pznqCU',
      },
      sku : {
        singleCreditRegular : 'sku_CdO9vxIEQ86ijZ'
      }
    })
  }

}