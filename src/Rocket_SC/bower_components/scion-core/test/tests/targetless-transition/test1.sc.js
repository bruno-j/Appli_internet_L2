//Generated on Tuesday, June 17, 2014 21:23:33 by the SCION SCXML compiler
module.exports = (function(_x,_sessionid,_name,_ioprocessors,In){
    
    
    
    
    var i;
    
    var $scion_early_binding_datamodel_has_fired= false;
    function $initEarlyBindingDatamodel(_event){
        if(!$scion_early_binding_datamodel_has_fired){
            i = $data_line_22_column_31.apply(this, arguments);
            $scion_early_binding_datamodel_has_fired = true; 
        }
    }
    
    function $deserializeDatamodel($serializedDatamodel){
        i = $serializedDatamodel["i"];
        $scion_early_binding_datamodel_has_fired = true;
    }
    
    function $serializeDatamodel(){
       return {
        "i" : i
       };
    }
    
    function $expr_line_27_column_47(_event){
        return i * 2;
    }
    
    function $assign_line_27_column_47(_event){
        i = $expr_line_27_column_47.apply(this, arguments);
    }
    
    function $cond_line_36_column_50(_event){
        return i === 8;
    }
    
    function $expr_line_32_column_59(_event){
        return Math.pow(i,3);
    }
    
    function $assign_line_32_column_59(_event){
        i = $expr_line_32_column_59.apply(this, arguments);
    }
    
    function $data_line_22_column_31(_event){
        return 1;
    }
    
    return {
        "": "http://www.w3.org/2005/07/scxml",
        "$type": "scxml",
        "states": [
            {
                "id": "A",
                "transitions": [
                    {
                        "event": "foo",
                        "onTransition": $assign_line_27_column_47
                    },
                    {
                        "target": "done",
                        "cond": $cond_line_36_column_50
                    }
                ],
                "states": [
                    {
                        "id": "a",
                        "transitions": [
                            {
                                "event": "bar",
                                "onTransition": $assign_line_32_column_59
                            }
                        ]
                    }
                ]
            },
            {
                "id": "done"
            }
        ],
        "onEntry": [
            $initEarlyBindingDatamodel
        ],
        "$deserializeDatamodel": $deserializeDatamodel,
        "$serializeDatamodel": $serializeDatamodel
    };});
