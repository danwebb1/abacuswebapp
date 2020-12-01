import React, {useState} from "react";
import {useInventory} from "../../Utils/hooks/inventory";

const InventoryQuickViewTableView = (props) => {
    const _inventory = JSON.parse(localStorage.getItem('abacusInventory')) ? JSON.parse(localStorage.getItem('abacusInventory')) : [];
    const inventory = useInventory();
    const [displayInventory, setDisplayInventory] = useState(_inventory.supply);

    if (props.inventorySet) {
            let threshold_operator;
            let threshold;
            if(props.inventorySet === 'caution'){
                threshold_operator = '<';
                threshold = 20;
            }
            if(props.inventorySet === 'warning') {
                threshold_operator = '===';
                threshold = 0;
            }
            let item_count = 0;
            let iter = 1;
            const table_view = displayInventory.map(supply_item => {
                iter = iter + 1;
                if (eval(supply_item.amount + threshold_operator + threshold )){
                    item_count = item_count + 1;
                    return (
                        <tr>
                            <td>{supply_item.item_id__item_code}</td>
                            <td>{supply_item.item_id__item_name}</td>
                            <td>{supply_item.amount}</td>
                        </tr>

                    )
                }
                if(displayInventory.length === iter){
                    if (item_count < 1){
                        let displayNone = "." + props.inventorySet + " {display:none}";
                        return <style>{displayNone}</style>

                    }
                }
            });
            return table_view;
    }else{
        let displayNone = "." + props.inventorySet + " {display:none}";
        return (
            <style>{displayNone}</style>
        )
    }
};

export default InventoryQuickViewTableView ;