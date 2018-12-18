'use strict'

module.exports = {

  defaults : {
    aws : ()=>({
      secretAccessKey : 'FIHEWSB1tgiy8ph6fHYQ3wLnY3mcvXicHtNoHtbX',
      region : 'us-west-1',
      accessKeyId : 'AKIAIYTAQKCRDGCO5A7Q',
    }),
    s3 : ()=> ({
      accessKeyId : 'AKIAIYTAQKCRDGCO5A7Q',
      secretAccessKey : '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',
      region : 'us-west-1',
      endpoint: `s3.amazonaws.com`,
      libraryBucket: 'lfthx-library',
      libraryPrefix: 'production/',
      s3Endpoint: 'https://s3-us-west-1.amazonaws.com/lfthx-library/production/',
      s3Region : 'us-west-1'
    }),
  }

}