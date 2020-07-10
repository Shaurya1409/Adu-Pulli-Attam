// Made by Shaurya Srivastava 
// The Code mainly functions by instantiating all Intersections of the board as objects of Node Class
// Further Movement Validations are made by assigning Goats and Tigers as pointers to Node Objects,
// and verifying if connected nodes are empty 


class Node{
    constructor(id,x,y){
        this.id = id
        this.conn = []
        this.empty = true;
        this.posx = `${x-3}%`;
        this.posy = `${y-3}%`;
        this.holder = null;
    }
}

node1 = new Node('node1',50,10);
node2 = new Node('node2',26.5,35);
node3 = new Node('node3',40.5,35);
node4 = new Node('node4',45.3,35);
node5 = new Node('node5',54.7,35);
node6 = new Node('node6',59.5,35);
node7 = new Node('node7',73.6,35);
node8 = new Node('node8',19.3,50);
node9 = new Node('node9',35,50);
node10 = new Node('node10',42.5,50);
node11 = new Node('node11',57.5,50);
node12 = new Node('node12',65,50);
node13 = new Node('node13',80.9,50);
node14 = new Node('node14',11.9,65);
node15 = new Node('node15',29.5,65);
node16 = new Node('node16',39.7,65);
node17 = new Node('node17',60.3,65);
node18 = new Node('node18',70.5,65);
node19 = new Node('node19',88.2,65);
node20 = new Node('node20',20,90);
node21 = new Node('node21',35,90);
node22 = new Node('node22',65,90);
node23 = new Node('node23',80,90);


node1.conn.push(node3,node4,node5,node6)
node2.conn.push(null,null,node3,node8)
node3.conn.push(node1,node2,node4,node9)
node4.conn.push(node1,node3,node5,node10)
node5.conn.push(node1,node4,node6,node11)
node6.conn.push(node1,node5,node7,node12)
node7.conn.push(null,node6,null,node13)
node8.conn.push(node2,null,node9,node14)
node9.conn.push(node3,node8,node10,node15)
node10.conn.push(node4,node9,node11,node16)
node11.conn.push(node5,node10,node12,node17)
node12.conn.push(node6,node11,node13,node18)
node13.conn.push(node7,node12,null,node19)
node14.conn.push(node8,null,node15,null)
node15.conn.push(node9,node14,node16,node20)
node16.conn.push(node10,node15,node17,node21)
node17.conn.push(node11,node16,node18,node22)
node18.conn.push(node12,node17,node19,node23)
node19.conn.push(node13,node18,null,null)
node20.conn.push(node15,null,node21,null)
node21.conn.push(node16,node20,node22,null)
node22.conn.push(node17,node21,node23,null)
node23.conn.push(node18,node22,null,null)

inv_map = {}


class Tiger{
    constructor(){
        this.loc = null;
    }

    get_available_moves(){
        var move_list = [];
        console.log(this.loc.id)
        console.log(this.loc.conn)
        $('circle').attr('fill','white');
        $('circle').attr('r','0.8%');

        for (var i=0; i<this.loc.conn.length;i++){
            if (this.loc.conn[i] !== null && this.loc.conn[i].empty === true){
                move_list.push(this.loc.conn[i]);
                var id = '#' + this.loc.conn[i].id
                $(id).attr("onclick","move_tiger(this.id)")

            }
            else if (this.loc.conn[i] !== null && this.loc.conn[i].empty === false && this.loc.conn[i].id !== 'node1' ){
                if (this.loc.conn[i].holder.startsWith('goat') && this.loc.conn[i].conn[i] !== null && this.loc.conn[i].conn[i].empty === true && this.loc.id !== 'node1'){
                    move_list.push(this.loc.conn[i].conn[i]);
                    var id = '#' + this.loc.conn[i].conn[i].id
                    $(id).attr("onclick","eliminate_goat(this.id)")
                }
                else if(this.loc.conn[i].holder.startsWith('goat') && this.loc.conn[i].conn[3] !== null && this.loc.conn[i].conn[3].empty === true && this.loc.id === 'node1'){
                    move_list.push(this.loc.conn[i].conn[3]);
                    var id = '#' + this.loc.conn[i].conn[3].id
                    $(id).attr("onclick","eliminate_goat(this.id)")
                }
                else{
                    continue
                }
            }
            else{
                continue
            }
        }
        return move_list;
    }
}


class Goat{
    constructor(){
        this.loc = null;
    }

    get_available_moves(){
        console.log(this.loc.id)
        console.log(this.loc.conn)
        $('circle').attr('fill','white');
        $('circle').attr('r','0.8%');
        var move_list = []

        for (var i=0; i<this.loc.conn.length;i++){
            if (this.loc.conn[i] !== null && this.loc.conn[i].empty === true){
                move_list.push(this.loc.conn[i])
            }
            else{
                continue
            }
        }
        return move_list;
    }        
    
}

tiger1 = new Tiger()
tiger1.loc = node1
tiger1.loc.empty = false
tiger1.loc.holder = "tiger1"

tiger2 = new Tiger()
tiger2.loc = node4
tiger2.loc.empty = false
tiger2.loc.holder = "tiger2"

tiger3 = new Tiger()
tiger3.loc = node5
tiger3.loc.empty = false
tiger3.loc.holder = "tiger3"

obj_map = {"tiger1":tiger1, "tiger2":tiger2,"tiger3":tiger3}
node_map = {'node1':node1, 'node2':node2, 'node3':node3, 'node4':node4, 'node5':node5, 'node6':node6, 'node7':node7,
'node8':node8, 'node9':node9, 'node10':node10, 'node11':node11, 'node12':node12, 'node13':node13, 'node14':node14,
'node15':node15, 'node16':node16, 'node17':node17, 'node18':node18, 'node19':node19,'node20':node20, 'node21':node21, 
'node22':node22, 'node23':node23}
goat_map = {};



var selected = null
var count = 15;

function change_color(obj){
    try{
        if (obj_map.hasOwnProperty(obj)){
            list = obj_map[obj].get_available_moves();
            for (var moves in list){
                var id = '#' + list[moves].id
                console.log(id)
                $(id).attr('fill','red');
                $(id).attr('r','1%');
            }
            selected = obj;
            console.log('Try Sucess')
        }
        else{
            list = goat_map[obj].get_available_moves();
            for (var moves in list){
                var id = '#' + list[moves].id
                console.log(id)
                $(id).attr('fill','red');
                $(id).attr('r','1%');
                $(id).attr("onclick","move_goat(this.id)")
            }
            selected = obj;
            console.log('Try Sucess')
        }
    }
    catch(err){
        console.log(err)
    }
}

function move_tiger(nodeid){
    console.log(selected)
    console.log(obj_map[selected].loc.posx)
    console.log(obj_map[selected].loc.posy)
    obj_map[selected].loc.empty = true;
    obj_map[selected].loc.holder = null;
    obj_map[selected].loc = node_map[nodeid]
    node_map[nodeid].empty = false
    node_map[nodeid].holder = selected
    $(`#${selected}`).attr('x',obj_map[selected].loc.posx);
    $(`#${selected}`).attr('y',obj_map[selected].loc.posy);
    selected = null;


    $('circle').attr('fill','white');
    $('circle').attr('r','0.8%');
    $('circle').removeAttr('onclick')
    $('image').removeAttr('onclick')
    $('image').removeAttr('onmouseover')
    $('image').removeAttr('onmouseout')

    if (check_goat_win()){
        var page = $('<div></div>').attr('id','finish_page').addClass('ip').html('<div class="paper"><h1>Player 2 Wins!</h1><p>Goats Successfully Blocked all Tigers!<br/>Reload Page to Play Again</p></div>')

        $('body').prepend(page)
        console.log('should_show')
    }
    else{
        console.log('false')
    }


    if (count>0){
        for (var key in node_map){
            if (node_map[key].empty === true){
                $(`#${node_map[key].id}`).attr('fill','yellow');
                $(`#${node_map[key].id}`).attr('r','1%');
                $(`#${node_map[key].id}`).attr("onclick","set_goat(this.id)");
            }
        }
    }
    else{
        for (var key in goat_map){
            $(`#${key}`).attr("onclick","change_color(this.id)");
            $(`#${key}`).attr("onmouseover","evt.target.setAttribute('height', '6.5%'); evt.target.setAttribute('width', '6.5%');");
            $(`#${key}`).attr("onmouseout","evt.target.setAttribute('height', '6%'); evt.target.setAttribute('width', '6%');");
            
        }
    }

    $('h4').text('Player 2');
    $('img').attr('src','images/goat.png');
    $('h5').show();

}

function move_goat(nodeid){
    console.log(selected)
    console.log(goat_map[selected].loc.posx)
    console.log(goat_map[selected].loc.posy)
    goat_map[selected].loc.empty = true;
    goat_map[selected].loc.holder = null;
    goat_map[selected].loc = node_map[nodeid]
    node_map[nodeid].empty = false
    node_map[nodeid].holder = selected
    $(`#${selected}`).attr('x',goat_map[selected].loc.posx);
    $(`#${selected}`).attr('y',goat_map[selected].loc.posy);
    selected = null;


    $('circle').attr('fill','white');
    $('circle').attr('r','0.8%');
    $('circle').removeAttr('onclick')
    $('image').removeAttr('onclick')
    $('image').removeAttr('onmouseover')
    $('image').removeAttr('onmouseout')

    if (check_goat_win()){
        var page = $('<div></div>').attr('id','finish_page').addClass('ip').html('<div class="paper"><h1>Player 2 Wins!</h1><p>Goats Successfully Blocked all Tigers!<br/>Reload Page to Play Again</p></div>')

        $('body').prepend(page)
        console.log('should_show')
    }
    else{
        console.log('false')
    }

    for (var key in obj_map){
        $(`#${key}`).attr("onclick","change_color(this.id)");
        $(`#${key}`).attr("onmouseover","evt.target.setAttribute('height', '6.5%'); evt.target.setAttribute('width', '6.5%');");
        $(`#${key}`).attr("onmouseout","evt.target.setAttribute('height', '6%'); evt.target.setAttribute('width', '6%');");
        
    }

    $('h4').text('Player 1');
    $('img').attr('src','images/tiger.jpg');
    $('h5').hide();
    
    console.log(check_goat_win())
}

var kill_count = 0;

function check_tiger_win(){
    if (kill_count >= 5){
        return (true)
    }
    else{
        return (false)
    }
}



function check_goat_win(){
    var all_bounded = true;
    for (var tiger in obj_map){
        console.log(tiger);
        list = obj_map[tiger].get_available_moves()
        if (list.length !== 0){
            all_bounded = false
            break
        }
    }
    $('circle').attr('fill','white');
    $('circle').attr('r','0.8%');
    $('circle').removeAttr('onclick')
    return(all_bounded);
}


function set_goat(id){
    console.log('set goat started')
    goat = `#goat${count}`
    goatobj = new Goat();
    goatobj.loc  = node_map[id];
    goatobj.loc.empty  = false;
    goatobj.loc.holder  = goat.replace("#",'');
    goat_map[goat.replace("#",'')] = goatobj
    $(goat).attr('x',node_map[id].posx);
    $(goat).attr('y',node_map[id].posy);
    $(goat).show();
    $('circle').attr('fill','white');
    $('circle').attr('r','0.8%');
    $('circle').removeAttr('onclick')
    count = count - 1;

    if (check_goat_win()){
        var page = $('<div></div>').attr('id','finish_page').addClass('ip').html('<div class="paper"><h1>Player 2 Wins!</h1><p>Goats Successfully Blocked all Tigers!<br/>Reload Page to Play Again</p></div>')

        $('body').prepend(page)
        console.log('should_show')
    }
    else{
        console.log('false')
    }

    for (var key in obj_map){
        $(`#${key}`).attr("onclick","change_color(this.id)");
        $(`#${key}`).attr("onmouseover","evt.target.setAttribute('height', '6.5%'); evt.target.setAttribute('width', '6.5%');");
        $(`#${key}`).attr("onmouseout","evt.target.setAttribute('height', '6%'); evt.target.setAttribute('width', '6%');");
        
    }
    $('h5').text(`x${count}`)
    $('h4').text('Player 1');
    $('img').attr('src','images/tiger.jpg');
    $('h5').hide();
    console.log(check_goat_win());
    console.log(goat_map);

}

function eliminate_goat(nodeid){
    console.log(selected)
    for (var nodes in obj_map[selected].loc.conn){
        if (obj_map[selected].loc.conn[nodes] !== null && obj_map[selected].loc.conn[nodes].conn[nodes] !== null && (obj_map[selected].loc.conn[nodes].conn[nodes].id === nodeid || obj_map[selected].loc.conn[nodes].conn[3].id === nodeid)){         
            $(`#${obj_map[selected].loc.conn[nodes].holder}`).remove();
            obj_map[selected].loc.conn[nodes].empty = true
            obj_map[selected].loc.conn[nodes].holder = null            

            obj_map[selected].loc.empty = true;
            obj_map[selected].loc.holder = null;
            obj_map[selected].loc = node_map[nodeid]
            node_map[nodeid].empty = false
            node_map[nodeid].holder = selected
            $(`#${selected}`).attr('x',obj_map[selected].loc.posx);
            $(`#${selected}`).attr('y',obj_map[selected].loc.posy);
            selected = null;

            console.log(goat_map)
            kill_count = kill_count + 1
            console.log(kill_count)


            $('circle').attr('fill','white');
            $('circle').attr('r','0.8%');
            $('circle').removeAttr('onclick')
            $('image').removeAttr('onclick')
            $('image').removeAttr('onmouseover')
            $('image').removeAttr('onmouseout')

            if (check_tiger_win()){

                var page = $('<div></div>').attr('id','finish_page').addClass('ip').html('<div class="paper"><h1>Player 1 Wins!</h1><p>Tigers Successfully Killed 5 Goats!<br/>Reload Page to Play Again</p></div>')

                $('body').prepend(page)
                console.log('should_show')
            }
            else{
                console.log('false')
            }

            if (count>0){
                for (var key in node_map){
                    if (node_map[key].empty === true){
                        $(`#${node_map[key].id}`).attr('fill','yellow');
                        $(`#${node_map[key].id}`).attr('r','1%');
                        $(`#${node_map[key].id}`).attr("onclick","set_goat(this.id)");
                    }
                }
            }
            else{
                for (var key in goat_map){
                    $(`#${key}`).attr("onclick","change_color(this.id)");
                    $(`#${key}`).attr("onmouseover","evt.target.setAttribute('height', '6.5%'); evt.target.setAttribute('width', '6.5%');");
                    $(`#${key}`).attr("onmouseout","evt.target.setAttribute('height', '6%'); evt.target.setAttribute('width', '6%');");
                    
                }
            }
        
            $('h4').text('Player 2');
            $('img').attr('src','images/goat.png');
            $('h5').show();

            break;

        }
        else{
            continue
        }
    }
}


