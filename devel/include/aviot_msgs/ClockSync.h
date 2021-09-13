// Generated by gencpp from file aviot_msgs/ClockSync.msg
// DO NOT EDIT!


#ifndef AVIOT_MSGS_MESSAGE_CLOCKSYNC_H
#define AVIOT_MSGS_MESSAGE_CLOCKSYNC_H


#include <string>
#include <vector>
#include <map>

#include <ros/types.h>
#include <ros/serialization.h>
#include <ros/builtin_message_traits.h>
#include <ros/message_operations.h>

#include <std_msgs/Header.h>

namespace aviot_msgs
{
template <class ContainerAllocator>
struct ClockSync_
{
  typedef ClockSync_<ContainerAllocator> Type;

  ClockSync_()
    : header()
    , value(0)  {
    }
  ClockSync_(const ContainerAllocator& _alloc)
    : header(_alloc)
    , value(0)  {
  (void)_alloc;
    }



   typedef  ::std_msgs::Header_<ContainerAllocator>  _header_type;
  _header_type header;

   typedef uint64_t _value_type;
  _value_type value;





  typedef boost::shared_ptr< ::aviot_msgs::ClockSync_<ContainerAllocator> > Ptr;
  typedef boost::shared_ptr< ::aviot_msgs::ClockSync_<ContainerAllocator> const> ConstPtr;

}; // struct ClockSync_

typedef ::aviot_msgs::ClockSync_<std::allocator<void> > ClockSync;

typedef boost::shared_ptr< ::aviot_msgs::ClockSync > ClockSyncPtr;
typedef boost::shared_ptr< ::aviot_msgs::ClockSync const> ClockSyncConstPtr;

// constants requiring out of line definition



template<typename ContainerAllocator>
std::ostream& operator<<(std::ostream& s, const ::aviot_msgs::ClockSync_<ContainerAllocator> & v)
{
ros::message_operations::Printer< ::aviot_msgs::ClockSync_<ContainerAllocator> >::stream(s, "", v);
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
struct IsFixedSize< ::aviot_msgs::ClockSync_<ContainerAllocator> >
  : FalseType
  { };

template <class ContainerAllocator>
struct IsFixedSize< ::aviot_msgs::ClockSync_<ContainerAllocator> const>
  : FalseType
  { };

template <class ContainerAllocator>
struct IsMessage< ::aviot_msgs::ClockSync_<ContainerAllocator> >
  : TrueType
  { };

template <class ContainerAllocator>
struct IsMessage< ::aviot_msgs::ClockSync_<ContainerAllocator> const>
  : TrueType
  { };

template <class ContainerAllocator>
struct HasHeader< ::aviot_msgs::ClockSync_<ContainerAllocator> >
  : TrueType
  { };

template <class ContainerAllocator>
struct HasHeader< ::aviot_msgs::ClockSync_<ContainerAllocator> const>
  : TrueType
  { };


template<class ContainerAllocator>
struct MD5Sum< ::aviot_msgs::ClockSync_<ContainerAllocator> >
{
  static const char* value()
  {
    return "85b556f2af6a79c3e57c029d50b2ad45";
  }

  static const char* value(const ::aviot_msgs::ClockSync_<ContainerAllocator>&) { return value(); }
  static const uint64_t static_value1 = 0x85b556f2af6a79c3ULL;
  static const uint64_t static_value2 = 0xe57c029d50b2ad45ULL;
};

template<class ContainerAllocator>
struct DataType< ::aviot_msgs::ClockSync_<ContainerAllocator> >
{
  static const char* value()
  {
    return "aviot_msgs/ClockSync";
  }

  static const char* value(const ::aviot_msgs::ClockSync_<ContainerAllocator>&) { return value(); }
};

template<class ContainerAllocator>
struct Definition< ::aviot_msgs::ClockSync_<ContainerAllocator> >
{
  static const char* value()
  {
    return "Header header\n\
uint64 value\n\
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
";
  }

  static const char* value(const ::aviot_msgs::ClockSync_<ContainerAllocator>&) { return value(); }
};

} // namespace message_traits
} // namespace ros

namespace ros
{
namespace serialization
{

  template<class ContainerAllocator> struct Serializer< ::aviot_msgs::ClockSync_<ContainerAllocator> >
  {
    template<typename Stream, typename T> inline static void allInOne(Stream& stream, T m)
    {
      stream.next(m.header);
      stream.next(m.value);
    }

    ROS_DECLARE_ALLINONE_SERIALIZER
  }; // struct ClockSync_

} // namespace serialization
} // namespace ros

namespace ros
{
namespace message_operations
{

template<class ContainerAllocator>
struct Printer< ::aviot_msgs::ClockSync_<ContainerAllocator> >
{
  template<typename Stream> static void stream(Stream& s, const std::string& indent, const ::aviot_msgs::ClockSync_<ContainerAllocator>& v)
  {
    s << indent << "header: ";
    s << std::endl;
    Printer< ::std_msgs::Header_<ContainerAllocator> >::stream(s, indent + "  ", v.header);
    s << indent << "value: ";
    Printer<uint64_t>::stream(s, indent + "  ", v.value);
  }
};

} // namespace message_operations
} // namespace ros

#endif // AVIOT_MSGS_MESSAGE_CLOCKSYNC_H
