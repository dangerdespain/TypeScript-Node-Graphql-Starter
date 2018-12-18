import mongoose from "mongoose";
import Bluebird from 'Bluebird'
import { get, functions, sortBy } from 'lodash'
const Client = require('instagram-private-api/client/v1');

import InboxThreadItem from '../InboxThreadItem'
type comparePasswordFunction = (candidatePassword: string, cb: (err: any, isMatch: any) => {}) => void;

export default (schema:any)=>{
  
  schema.methods.refreshInstagramData = async function(sessionData:any){
    console.log(this, this.default)
    let thread = new Client.Feed.ThreadItems(sessionData.session, this.inboxThreadId, 9)
    
    let ThreadItemsPromise = (threadData:any[])=>Bluebird.map(threadData,(threadItem:any)=>{
      return (
        InboxThreadItem.findOneAndUpdate({ 
          inboxThreadItemId : threadItem.id
        }, {
          inboxThreadId : this.inboxThreadId,
          inboxThreadItemDataFetchError : null,
          inboxThreadItemData : get(threadItem,'_params',{}),
        }, { 
          upsert : true 
        })
      )
    })
      
    let threadItemData
    let caughtUpInFeed = false;
    let count = 0;

    while(count < 6 && !caughtUpInFeed){
      threadItemData = await thread.get()
      // threadData = sortBy(threadData,item=>get(item,'_params.lastActivityAt'))
      let lastThreadItemData = threadItemData.pop()
      let newPosts = await ThreadItemsPromise(threadItemData).then(()=>{})
      let lastThreadItem = await InboxThreadItem.findOne({ inboxThreadItemId : get(lastThreadItemData,'id') })
      if(lastThreadItem){
        caughtUpInFeed = true
        await Bluebird.delay(1000 + Math.floor(Math.random() * 1500))
        return 
      }
      await ThreadItemsPromise([lastThreadItemData])
      count = count + 1;
    }

    return true
  }


  return schema
}