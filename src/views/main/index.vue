<template>
    <div class="card">
        <p>
            别人要怎样生活是他们的选择，而我这辈子要如何生活是我的决定，它无需符合什么标准，也不需要得到他人的认可。对我来说唯一要做的就是想清楚自己到底要什么，全心全意，用自己想要的方式，过属于自己的生活，不论这种生活是不是大众眼中所谓的“成功”
        </p>
    </div>

    <div class="list">
        <div class="item" v-for="i in 8" :key="i">模块 {{ i }}</div>
    </div>

    <div class="middle flex">
        <div class="dependence common">
            <div class="flex title">
                <h4>依赖信息：</h4>
                <p>部署时间：2023/3/8</p>
            </div>
            <el-divider />
            <div class="plr">内容</div>
        </div>
        <div class="logs common">
            <div class="title">更新日志</div>
            <el-divider />
            <div class="plr">
                <el-timeline>
                    <el-timeline-item
                        v-for="(activity, index) in activities"
                        :key="index"
                        :icon="activity.icon"
                        :type="activity.type"
                        :color="activity.color"
                        :size="activity.size"
                        :hollow="activity.hollow"
                        :timestamp="activity.timestamp"
                    >
                        {{ activity.content }}
                    </el-timeline-item>
                </el-timeline>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const activities = [
    {
        content: '开发中..制作一个适合小白快速上手的后台',
        timestamp: '2023-03-08 17:04',
        size: 'large',
        type: 'primary',
        icon: 'MoreFilled',
    },
    {
        content: 'Custom color',
        timestamp: '2018-04-03 20:46',
        color: '#0bbd87',
    },
    {
        content: 'Custom size',
        timestamp: '2018-04-03 20:46',
        size: 'large',
    },
    {
        content: 'Custom hollow',
        timestamp: '2018-04-03 20:46',
        type: 'primary',
        hollow: true,
    },
    {
        content: 'Default node',
        timestamp: '2018-04-03 20:46',
    },
]
</script>

<style scoped lang="scss">
$white: #fff;
.card {
    width: 100%;
    padding: 40px 20px;
    font-size: 12px;
    border: 1px solid #ebeef5;
    margin-bottom: 20px;
    background-color: #fff;
    color: #959595;
    border-radius: 6px;
}
.list {
    display: flex;
    flex-wrap: wrap;
    .item {
        width: 23.5%;
        margin: 0 2% 2% 0;
        height: 10vh;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 6px;
        background-color: #fff;
        &:nth-child(4n) {
            margin-right: 0;
        }
    }
}

.middle {
    .common {
        background-color: $white;
        border-radius: 6px;

        width: 49%;
        .title {
            padding: 20px 20px 0 20px;
        }
        .plr {
            padding: 0 40px;
        }
    }
}
.flex {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
</style>
