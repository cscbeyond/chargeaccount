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

<style lang="less">
@import url('./index.less');
</style>
