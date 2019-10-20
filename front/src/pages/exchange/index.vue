<template>
    <div>

        <!--main.wxml-->

        <div class="content">
            <div class="layout-top">

                <!--第01组-->
                <div v-for="(item,idx) in selectCurrencyList" :key="idx" @click="currencyClick">
                    <div class="currency-cal">
                        {{item.currencyCal}}
                    </div>
                    <div class="currency-name-en">
                        {{item.currencyNameEN}}
                    </div>
                    <div class="currency-value">
                        {{item.currencyValue}}
                    </div>
                    <div class="currency-name-cn">
                        {{item.currencyNameCN}}
                    </div>
                </div>

            </div>

            <div class="layout-bottom">
                <div class="btnGroup">
                    <div class="item blue" @click="clickBtn" id="id9">9</div>
                    <div class="item blue" @click="clickBtn" id="id8">8</div>
                    <div class="item blue" @click="clickBtn" id="id7">7</div>
                    <div class="item orange" @click="clickBtn" id="idp">＋</div>
                </div>
               <div class="btnGroup">
                    <div class="item blue" @click="clickBtn" id="id6">6</div>
                    <div class="item blue" @click="clickBtn" id="id5">5</div>
                    <div class="item blue" @click="clickBtn" id="id4">4</div>
                    <div class="item orange" @click="clickBtn" id="idj">－</div>
                </div>
                <div class="btnGroup">
                    <div class="item blue" @click="clickBtn" id="id3">3</div>
                    <div class="item blue" @click="clickBtn" id="id2">2</div>
                    <div class="item blue" @click="clickBtn" id="id1">1</div>
                    <div class="item orange" @click="clickBtn" id="idx">×</div>
                </div>
                <div class="btnGroup">
                    <div class="item blue" @click="clickBtn" id="idd">.</div>
                    <div class="item blue" @click="clickBtn" id="id0">0</div>
                    <div class="item orange" @click="clickBtn" id="idb">←</div>
                    <div class="item orange" @click="clickBtn" id="iddiv">÷</div>
                </div> 
            </div>
        </div>
    </div>
</template>

<script>
    export default {

    }

</script>

<style>

/**index.wxss**/
.content {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    
    font-family: "Microsoft YaHei";
    overflow-x: hidden;
}

/**所选货币列表 **/
.layout-top{
    width: 100%;
    height: 50%;
    margin-bottom: 2rpx;
}
.currency-group,.currency-group-selected {
    width: 100%;
    display: flex;
    flex-wrap:wrap;
    flex-direction: row;
    justify-content: space-around;
    flex: 1;
    height: 24%;
    border-bottom: 1px solid #d9eef7;
}
.currency-group-selected {
    height: 28%;
    background-color: #d9eef7;
}
.currency-cal{
    /**左右各3%，作为padding**/
    width: 94%;
    text-align: right;
    font-size:12px;
    color: #ccc; 
    
}
.currency-name-en{
     /**左右各3%，作为padding**/
    width:24%;
    text-align: left;
}
.currency-value{
     /**左右各3%，作为padding**/
    width: 64%;
    text-align: right;
}
.currency-name-cn {
     /**左右各3%，作为padding**/
    width: 94%;
    text-align: right;
    font-size:12px;
    color: #ccc; 
}


/**输入区**/
.layout-bottom{
    width: 100%;
    height: 50%;
}
.btnGroup {
    display: flex;
    flex-direction: row;
    flex: 1;
    width: 100%;
    height: 25%;
    background-color: #fff;
}
.item {
    width:25%;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    margin-top: 1px;
    margin-right: 1px;
}
.item:active {
    background-color: #ff0000;
}

.orange {
    color: #fef4e9;
    background: #f78d1d;
    font-weight: bold;
}
.blue {
    color:#d9eef7;
    background-color: #0095cd;
}
.iconBtn{
    display: flex;
}

</style>
