const {ccclass, property} = cc._decorator;

@ccclass
export default class Helloworld extends cc.Component {

    @property(cc.Button)
    m_start: cc.Button = null;

    @property(cc.Node)
    m_role: cc.Node = null;

    @property(cc.Prefab)
    m_bg:cc.Prefab = null;

    @property(cc.Label)
    m_score:cc.Label = null;

    m_alive:boolean = false;
    m_playerTimes:number = 0;
    m_bgs:Array<cc.Node> = [];
    m_tweens:Array<cc.Tween> = [];
    m_initPos:cc.Vec3;
    m_gravity:cc.Vec2;
    m_speedVal:number = 2;
    m_scoreValue:number = 0;
    m_bgCnt:number = 3;

    btStartGame(){
        this.m_start.node.active = false;
        this.m_alive = true;
        this.m_role.position = this.m_initPos;
        this.m_scoreValue = 0;
        this.m_score.string = "得分：" + this.m_scoreValue.toString();
        this.node.on(cc.Node.EventType.TOUCH_START, this.powerRole, this);
        cc.director.getPhysicsManager().gravity = this.m_gravity;

        for(let i = 0;i < 3; i++){
            this.m_bgs[i].x = 640 * ( i - 1);
            this.m_tweens[i].start();
        }
    }

    start () {
        this.m_score.string = "得分：" + this.m_scoreValue.toString();
        for(let i = 0; i < this.m_bgCnt; i++){
            let bg = cc.instantiate(this.m_bg);
            bg.x += 640 * ( i - 1);
            bg.parent = this.node;
            bg.zIndex = -1;
            
            let initPillarsPos1 = bg.getChildByName("pillars").position;
            initPillarsPos1.y += Math.floor( Math.random()*100);
            let initPillarsPos2 = bg.getChildByName("pillars").position;
            initPillarsPos2.y -= Math.floor( Math.random()*100);

            let tween = cc.tween(bg.getChildByName("pillars"))
                .repeatForever(cc.tween()
                    .to(1, {position:initPillarsPos1})
                    .to(1, {position:initPillarsPos2})
                );
            this.m_tweens.push(tween);
            // bg.getChildByName("label").getComponent(cc.Label).string = i.toString();
            this.m_bgs.push(bg);
        }
    }

    public stopPower(){
        this.m_alive = false;
        this.m_playerTimes++;
        this.node.off(cc.Node.EventType.TOUCH_START, this.powerRole, this);
        for(let i=0;i<this.m_bgCnt;i++){
            this.m_tweens[i].stop();
        }
    }

    powerRole(){
        let righidBody = this.m_role.getComponent(cc.RigidBody);
        righidBody.applyForceToCenter(new cc.Vec2(0,30000), true);
    }

    onLoad () {
        cc.director.getPhysicsManager().enabled = true;
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        // manager.enabledDebugDraw = true;
        // manager.enabledDrawBoundingBox = true;

        this.m_gravity = cc.director.getPhysicsManager().gravity;
        cc.director.getPhysicsManager().gravity = cc.v2();
        this.m_initPos = this.m_role.position;
    }

    AddScore(){
        this.m_scoreValue++;
        this.m_score.string = "得分：" + this.m_scoreValue.toString();
    }

    update (dt) {
        if(this.m_alive){
            for(let i=0;i<this.m_bgCnt;i++){
                this.m_bgs[i].x -= this.m_speedVal;
            }
            let maxX = this.m_bgs[0].x;
            let minX = this.m_bgs[0].x;
            let minI = 0;
            for(let i=0;i<this.m_bgCnt;i++){
                if (this.m_bgs[i].x > maxX){
                    maxX = this.m_bgs[i].x;
                }
                if (this.m_bgs[i].x < minX){
                    minI = i;
                    minX = this.m_bgs[i].x;
                }
            }
            if (minX < -640){
                this.m_bgs[minI].x = maxX + 640;
                console.log("change ", minI, " to ", this.m_bgs[minI].x);
            }
        }
    }
}
