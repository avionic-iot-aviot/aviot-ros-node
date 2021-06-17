cmake_minimum_required(VERSION 2.8.3)
project(aviot_srvs)

find_package(catkin REQUIRED COMPONENTS message_generation geometry_msgs)

add_service_files(
  DIRECTORY srv
  FILES
  SetFence.srv
  DeleteFence.srv
  ResetFence.srv
)

generate_messages(DEPENDENCIES geometry_msgs)

catkin_package(
  CATKIN_DEPENDS message_runtime)

install(DIRECTORY include/${PROJECT_NAME}/
  DESTINATION ${CATKIN_PACKAGE_INCLUDE_DESTINATION}
  FILES_MATCHING PATTERN "*.h")
