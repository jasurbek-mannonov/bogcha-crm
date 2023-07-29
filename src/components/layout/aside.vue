<template>
    <aside>
        <nav>
            <router-link to="/" exact>
                <el-icon>
                    <HomeFilled/>
                </el-icon>
                Bosh sahifa
            </router-link>
            <router-link to="/products">
                <el-icon>
                    <PieChart />
                </el-icon>
                Mahsulotlar
            </router-link>
        </nav>
    </aside>
</template>

<script setup>

</script>

<style lang="scss">   
@import '@/styles/vars/colors.scss';
    aside{
        width: 200px;
        height: 100%;
        background-color: #fff;
        padding: 15px;
        nav{
            display: flex;
            flex-direction: column;
            gap: 15px;
            a{
                background-color: #f2f2f2;
                display: flex;
                align-items: center;
                gap: 10px;
                padding: 10px;
                border-radius: 10px;
                &.router-link-active{
                    background-color: $green;
                    color: #f2f2f2;
                }
            }
        }
    }
</style>