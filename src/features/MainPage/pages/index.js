import { Avatar, List, Input, Pagination, Row, Col, Button } from "antd";
import { LikeFilled, LikeTwoTone, UserOutlined } from "@ant-design/icons";
import React, { useRef, useState } from "react";
import styled from "styled-components";
import mainService from "../services/main.service";
import ProfileModal from "../../../components/profileModal";

const { Search } = Input;

const MainPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const inputEl = useRef(null);

  const onSearch = (value, page = 0, per_page = 10) => {
    mainService.searchGithubUsers({ q: value, page, per_page }).then((data) => {
      setDataSource(data.data.items);
      setTotalItems(data.data.total_count);
    });
  };

  const handleClickButton = (id) => {
    mainService.likeGithubProfile(id).then((data) => {
      const index = dataSource.findIndex((d) => d.id === id);
      const updatedObj = {
        ...dataSource[index],
        liked: true,
      };
      setDataSource([
        ...dataSource.slice(0, index),
        updatedObj,
        ...dataSource.slice(index + 1),
      ]);
    });
  };
  return (
    <>
      {isModalOpen && (
        <ProfileModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      )}
      <NavWrapper>
        <Search
          ref={inputEl}
          placeholder="input search text"
          allowClear
          enterButton="Search"
          size="large"
          onSearch={(value) => onSearch(value)}
        />
        <Button
          shape="circle"
          size="large"
          icon={<UserOutlined />}
          onClick={() => setIsModalOpen(true)}
        />
      </NavWrapper>
      <MainPageWrapper>
        {dataSource && dataSource.length > 0 && (
          <div>
            <List
              itemLayout="vertical"
              size="large"
              pagination={false}
              dataSource={dataSource}
              renderItem={(item) => (
                <List.Item
                  key={item.id}
                  actions={[
                    <Button
                      type={!item.liked ? "dashed" : "primary"}
                      icon={!item.liked ? <LikeFilled /> : <LikeTwoTone />}
                      onClick={() => handleClickButton(item.id)}
                    >
                      Like
                    </Button>,
                  ]}
                >
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
            <Pagination
              showQuickJumper
              total={totalItems}
              onChange={(page, pageSize) => {
                onSearch(inputEl.current.input.value, page, pageSize);
              }}
            />
          </div>
        )}
      </MainPageWrapper>
    </>
  );
};

const NavWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

const MainPageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 50px;
  height: 100%;
  width: 100vw;
`;
export default MainPage;
