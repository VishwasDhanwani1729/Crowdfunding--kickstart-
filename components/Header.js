import React from 'react';
import {Menu} from 'semantic-ui-react';
import {Link} from '../routes.js';
export default ()=>{
    return (
        //<Menu.Item>CrowdCoin</Menu.Item> can't use this with <Link> tag css clashes
        <Menu style={{marginTop : '10px'}}>
            <Link route='/'>
                <a className="item">CrowdCoin</a>
            </Link>
            <Menu.Menu position="right">
                <Link route='/'>
                    <a className="item">Campaign</a>
                </Link>
                <Link route='/campaigns/new'>
                    <a className="item">+</a>
                </Link>
            </Menu.Menu>
        </Menu>
    );
};