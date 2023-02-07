import { Avatar, List, Modal, Row, Col } from "antd";
import { useEffect, useState } from "react";
import mainService from "../features/MainPage/services/main.service";
const ProfileModal = ({ isModalOpen, setIsModalOpen }) => {
  const [dataSource, setDataSource] = useState([]);
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const loadData = async () => {
      const result = await mainService.getUserProfile();
      setDataSource(result.data.favorite_github_users);
    };
    loadData();
  }, []);
  return (
    <>
      <Modal
        title="Profile"
        open={isModalOpen}
        onOk={handleCancel}
        okText={"Close"}
        cancelButtonProps={{ style: { display: "none" } }}
      >
        <h2>Phone Number: {localStorage.getItem("phoneNumber")}</h2>
        {dataSource && dataSource.length > 0 && (
          <div>
            <List
              itemLayout="vertical"
              size="large"
              pagination={false}
              dataSource={dataSource}
              renderItem={(item) => (
                <List.Item key={item.id}>
                  <List.Item.Meta
                    avatar={<Avatar src={item.avatar_url} />}
                    title={<a href={item.login}>{item.login}</a>}
                  />
                  <Row gutter={[8, 8]}>
                    <Col span={12}>ID: {item.id}</Col>
                    <Col span={12}>HTML URL: {item.html_url}</Col>
                    <Col span={12}>Public Repo: {item.repos_url}</Col>
                    <Col span={12}>Followers: {item.followers_url}</Col>
                  </Row>
                </List.Item>
              )}
            />
          </div>
        )}
      </Modal>
    </>
  );
};
export default ProfileModal;
