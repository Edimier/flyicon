// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    // LIFE-CYCLE CALLBACKS:
    // onLoad () {}

    start () {

    }

    onCollisionEnter(other:cc.Node, self:cc.Node) {
        console.log("xxxxxxxxxxxxxxxxxxxxx");
        if(other.getComponent(cc.BoxCollider).tag == 1){
            this.node.parent.getComponent("Helloworld").AddScore();
        } else {
            let rigbody = this.node.getComponent(cc.RigidBody);
            rigbody.linearVelocity = new cc.Vec2(0,0);
            cc.director.getPhysicsManager().gravity = cc.v2();
            this.node.parent.getChildByName("start_bt").active = true;
            this.node.parent.getComponent("Helloworld").stopPower();
        }
    }

    // update (dt) {}
}
