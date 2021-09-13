// Generated by gencpp from file aviot_msgs/FenceStatus.msg
// DO NOT EDIT!


#ifndef AVIOT_MSGS_MESSAGE_FENCESTATUS_H
#define AVIOT_MSGS_MESSAGE_FENCESTATUS_H


#include <string>
#include <vector>
#include <map>

#include <ros/types.h>
#include <ros/serialization.h>
#include <ros/builtin_message_traits.h>
#include <ros/message_operations.h>

#include <std_msgs/Header.h>
#include <geometry_msgs/Point.h>

namespace aviot_msgs
{
template <class ContainerAllocator>
struct FenceStatus_
{
  typedef FenceStatus_<ContainerAllocator> Type;

  FenceStatus_()
    : header()
    , inForbiddenPosition(false)
    , allowedAreas()
    , deniedAreas()
    , distance(0.0)
    , vector()  {
    }
  FenceStatus_(const ContainerAllocator& _alloc)
    : header(_alloc)
    , inForbiddenPosition(false)
    , allowedAreas(_alloc)
    , deniedAreas(_alloc)
    , distance(0.0)
    , vector(_alloc)  {
  (void)_alloc;
    }



   typedef  ::std_msgs::Header_<ContainerAllocator>  _header_type;
  _header_type header;

   typedef uint8_t _inForbiddenPosition_type;
  _inForbiddenPosition_type inForbiddenPosition;

   typedef std::vector<uint32_t, typename ContainerAllocator::template rebind<uint32_t>::other >  _allowedAreas_type;
  _allowedAreas_type allowedAreas;

   typedef std::vector<uint32_t, typename ContainerAllocator::template rebind<uint32_t>::other >  _deniedAreas_type;
  _deniedAreas_type deniedAreas;

   typedef double _distance_type;
  _distance_type distance;

   typedef  ::geometry_msgs::Point_<ContainerAllocator>  _vector_type;
  _vector_type vector;





  typedef boost::shared_ptr< ::aviot_msgs::FenceStatus_<ContainerAllocator> > Ptr;
  typedef boost::shared_ptr< ::aviot_msgs::FenceStatus_<ContainerAllocator> const> ConstPtr;

}; // struct FenceStatus_

typedef ::aviot_msgs::FenceStatus_<std::allocator<void> > FenceStatus;

typedef boost::shared_ptr< ::aviot_msgs::FenceStatus > FenceStatusPtr;
typedef boost::shared_ptr< ::aviot_msgs::FenceStatus const> FenceStatusConstPtr;

// constants requiring out of line definition



template<typename ContainerAllocator>
std::ostream& operator<<(std::ostream& s, const ::aviot_msgs::FenceStatus_<ContainerAllocator> & v)
{
ros::message_operations::Printer< ::aviot_msgs::FenceStatus_<ContainerAllocator> >::stream(s, "", v);
return s;
}

} // namespace aviot_msgs

namespace ros
{
namespace message_traits
{



// BOOLTRAITS {'IsFixedSize': False, 'IsMessage': True, 'HasHeader': True}
// {'std_msgs': ['/opt/ros/kinetic/share/std_msgs/cmake/../msg'], 'geometry_msgs': ['/opt/ros/kinetic/share/geometry_msgs/cmake/../msg'], 'aviot_msgs': ['/home/aviot/catkin_ws/src/aviot_msgs/msg']}

// !!!!!!!!!!! ['__class__', '__delattr__', '__dict__', '__doc__', '__eq__', '__format__', '__getattribute__', '__hash__', '__init__', '__module__', '__ne__', '__new__', '__reduce__', '__reduce_ex__', '__repr__', '__setattr__', '__sizeof__', '__str__', '__subclasshook__', '__weakref__', '_parsed_fields', 'constants', 'fields', 'full_name', 'has_header', 'header_present', 'names', 'package', 'parsed_fields', 'short_name', 'text', 'types']




template <class ContainerAllocator>
struct IsFixedSize< ::aviot_msgs::FenceStatus_<ContainerAllocator> >
  : FalseType
  { };

template <class ContainerAllocator>
struct IsFixedSize< ::aviot_msgs::FenceStatus_<ContainerAllocator> const>
  : FalseType
  { };

template <class ContainerAllocator>
struct IsMessage< ::aviot_msgs::FenceStatus_<ContainerAllocator> >
  : TrueType
  { };

template <class ContainerAllocator>
struct IsMessage< ::aviot_msgs::FenceStatus_<ContainerAllocator> const>
  : TrueType
  { };

template <class ContainerAllocator>
struct HasHeader< ::aviot_msgs::FenceStatus_<ContainerAllocator> >
  : TrueType
  { };

template <class ContainerAllocator>
struct HasHeader< ::aviot_msgs::FenceStatus_<ContainerAllocator> const>
  : TrueType
  { };


template<class ContainerAllocator>
struct MD5Sum< ::aviot_msgs::FenceStatus_<ContainerAllocator> >
{
  static const char* value()
  {
    return "8b7090ab19bc906baf2413dee62004e9";
  }

  static const char* value(const ::aviot_msgs::FenceStatus_<ContainerAllocator>&) { return value(); }
  static const uint64_t static_value1 = 0x8b7090ab19bc906bULL;
  static const uint64_t static_value2 = 0xaf2413dee62004e9ULL;
};

template<class ContainerAllocator>
struct DataType< ::aviot_msgs::FenceStatus_<ContainerAllocator> >
{
  static const char* value()
  {
    return "aviot_msgs/FenceStatus";
  }

  static const char* value(const ::aviot_msgs::FenceStatus_<ContainerAllocator>&) { return value(); }
};

template<class ContainerAllocator>
struct Definition< ::aviot_msgs::FenceStatus_<ContainerAllocator> >
{
  static const char* value()
  {
    return "Header header\n\
bool inForbiddenPosition\n\
uint32[] allowedAreas\n\
uint32[] deniedAreas\n\
float64 distance\n\
geometry_msgs/Point vector\n\
\n\
================================================================================\n\
MSG: std_msgs/Header\n\
# Standard metadata for higher-level stamped data types.\n\
# This is generally used to communicate timestamped data \n\
# in a particular coordinate frame.\n\
# \n\
# sequence ID: consecutively increasing ID \n\
uint32 seq\n\
#Two-integer timestamp that is expressed as:\n\
# * stamp.sec: seconds (stamp_secs) since epoch (in Python the variable is called 'secs')\n\
# * stamp.nsec: nanoseconds since stamp_secs (in Python the variable is called 'nsecs')\n\
# time-handling sugar is provided by the client library\n\
time stamp\n\
#Frame this data is associated with\n\
# 0: no frame\n\
# 1: global frame\n\
string frame_id\n\
\n\
================================================================================\n\
MSG: geometry_msgs/Point\n\
# This contains the position of a point in free space\n\
float64 x\n\
float64 y\n\
float64 z\n\
";
  }

  static const char* value(const ::aviot_msgs::FenceStatus_<ContainerAllocator>&) { return value(); }
};

} // namespace message_traits
} // namespace ros

namespace ros
{
namespace serialization
{

  template<class ContainerAllocator> struct Serializer< ::aviot_msgs::FenceStatus_<ContainerAllocator> >
  {
    template<typename Stream, typename T> inline static void allInOne(Stream& stream, T m)
    {
      stream.next(m.header);
      stream.next(m.inForbiddenPosition);
      stream.next(m.allowedAreas);
      stream.next(m.deniedAreas);
      stream.next(m.distance);
      stream.next(m.vector);
    }

    ROS_DECLARE_ALLINONE_SERIALIZER
  }; // struct FenceStatus_

} // namespace serialization
} // namespace ros

namespace ros
{
namespace message_operations
{

template<class ContainerAllocator>
struct Printer< ::aviot_msgs::FenceStatus_<ContainerAllocator> >
{
  template<typename Stream> static void stream(Stream& s, const std::string& indent, const ::aviot_msgs::FenceStatus_<ContainerAllocator>& v)
  {
    s << indent << "header: ";
    s << std::endl;
    Printer< ::std_msgs::Header_<ContainerAllocator> >::stream(s, indent + "  ", v.header);
    s << indent << "inForbiddenPosition: ";
    Printer<uint8_t>::stream(s, indent + "  ", v.inForbiddenPosition);
    s << indent << "allowedAreas[]" << std::endl;
    for (size_t i = 0; i < v.allowedAreas.size(); ++i)
    {
      s << indent << "  allowedAreas[" << i << "]: ";
      Printer<uint32_t>::stream(s, indent + "  ", v.allowedAreas[i]);
    }
    s << indent << "deniedAreas[]" << std::endl;
    for (size_t i = 0; i < v.deniedAreas.size(); ++i)
    {
      s << indent << "  deniedAreas[" << i << "]: ";
      Printer<uint32_t>::stream(s, indent + "  ", v.deniedAreas[i]);
    }
    s << indent << "distance: ";
    Printer<double>::stream(s, indent + "  ", v.distance);
    s << indent << "vector: ";
    s << std::endl;
    Printer< ::geometry_msgs::Point_<ContainerAllocator> >::stream(s, indent + "  ", v.vector);
  }
};

} // namespace message_operations
} // namespace ros

#endif // AVIOT_MSGS_MESSAGE_FENCESTATUS_H