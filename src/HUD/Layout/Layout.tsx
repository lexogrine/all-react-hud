import React, { useEffect, useState } from "react";
import { configs } from "../../App";
import { CameraTemplate } from './../CameraTemplate';
export const Layout = () => {
  const [ hostsInfo, setHostsInfo ] = useState({ left: { username: '@GuyOne', name: 'Guy One'}, right: { username: '@GuyTwo', name: 'Guy Two'}})

  useEffect(() => {
    configs.onChange((data: any) => {
      if(!data || !data.display_settings) return;
      const { left_username, right_username, left_name, right_name } = data.display_settings;
      setHostsInfo({
        left: {
          username: left_username,
          name: left_name
        },
        right: {
          username: right_username,
          name: right_name
        }
      })
    });
  }, []);

  return (
    <div className="layout">
      <div className="cameras">
        <CameraTemplate username={hostsInfo.left.username} name={hostsInfo.left.name} />
        <CameraTemplate username={hostsInfo.right.username} name={hostsInfo.right.name} />
      </div>
    </div>
  )
}