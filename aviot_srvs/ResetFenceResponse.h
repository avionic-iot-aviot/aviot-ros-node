// Generated by gencpp from file aviot_srvs/ResetFenceResponse.msg
// DO NOT EDIT!


#ifndef AVIOT_SRVS_MESSAGE_RESETFENCERESPONSE_H
#define AVIOT_SRVS_MESSAGE_RESETFENCERESPONSE_H


#include <string>
#include <vector>
#include <map>

#include <ros/types.h>
#include <ros/serialization.h>
#include <ros/builtin_message_traits.h>
#include <ros/message_operations.h>


namespace aviot_srvs
{
template <class ContainerAllocator>
struct ResetFenceResponse_
{
  typedef ResetFenceResponse_<ContainerAllocator> Type;

  ResetFenceResponse_()
    : done(0)  {
    }
  ResetFenceResponse_(const ContainerAllocator& _alloc)
    : done(0)  {
  (void)_alloc;
    }



   typedef uint8_t _done_type;
  _done_type done;





  typedef boost::shared_ptr< ::aviot_srvs::ResetFenceResponse_<ContainerAllocator> > Ptr;
  typedef boost::shared_ptr< ::aviot_srvs::ResetFenceResponse_<ContainerAllocator> const> ConstPtr;

}; // struct ResetFenceResponse_

typedef ::aviot_srvs::ResetFenceResponse_<std::allocator<void> > ResetFenceResponse;

typedef boost::shared_ptr< ::aviot_srvs::ResetFenceResponse > ResetFenceResponsePtr;
typedef boost::shared_ptr< ::aviot_srvs::ResetFenceResponse const> ResetFenceResponseConstPtr;

// constants requiring out of line definition



template<typename ContainerAllocator>
std::ostream& operator<<(std::ostream& s, const ::aviot_srvs::ResetFenceResponse_<ContainerAllocator> & v)
{
ros::message_operations::Printer< ::aviot_srvs::ResetFenceResponse_<ContainerAllocator> >::stream(s, "", v);
return s;
}

} // namespace aviot_srvs

namespace ros
{
namespace message_traits
{



// BOOLTRAITS {'IsFixedSize': True, 'HasHeader': False, 'IsMessage': True}
// {'std_msgs': ['/opt/ros/kinetic/share/std_msgs/cmake/../msg'], 'geometry_msgs': ['/opt/ros/kinetic/share/geometry_msgs/cmake/../msg']}

// !!!!!!!!!!! ['__class__', '__delattr__', '__dict__', '__dir__', '__doc__', '__eq__', '__format__', '__ge__', '__getattribute__', '__gt__', '__hash__', '__init__', '__le__', '__lt__', '__module__', '__ne__', '__new__', '__reduce__', '__reduce_ex__', '__repr__', '__setattr__', '__sizeof__', '__str__', '__subclasshook__', '__weakref__', '_parsed_fields', 'constants', 'fields', 'full_name', 'has_header', 'header_present', 'names', 'package', 'parsed_fields', 'short_name', 'text', 'types']




template <class ContainerAllocator>
struct IsFixedSize< ::aviot_srvs::ResetFenceResponse_<ContainerAllocator> >
  : TrueType
  { };

template <class ContainerAllocator>
struct IsFixedSize< ::aviot_srvs::ResetFenceResponse_<ContainerAllocator> const>
  : TrueType
  { };

template <class ContainerAllocator>
struct HasHeader< ::aviot_srvs::ResetFenceResponse_<ContainerAllocator> >
  : FalseType
  { };

template <class ContainerAllocator>
struct HasHeader< ::aviot_srvs::ResetFenceResponse_<ContainerAllocator> const>
  : FalseType
  { };

template <class ContainerAllocator>
struct IsMessage< ::aviot_srvs::ResetFenceResponse_<ContainerAllocator> >
  : TrueType
  { };

template <class ContainerAllocator>
struct IsMessage< ::aviot_srvs::ResetFenceResponse_<ContainerAllocator> const>
  : TrueType
  { };


template<class ContainerAllocator>
struct MD5Sum< ::aviot_srvs::ResetFenceResponse_<ContainerAllocator> >
{
  static const char* value()
  {
    return "f0fad9ccd7b64cd66ec986070ce0fd3f";
  }

  static const char* value(const ::aviot_srvs::ResetFenceResponse_<ContainerAllocator>&) { return value(); }
  static const uint64_t static_value1 = 0xf0fad9ccd7b64cd6ULL;
  static const uint64_t static_value2 = 0x6ec986070ce0fd3fULL;
};

template<class ContainerAllocator>
struct DataType< ::aviot_srvs::ResetFenceResponse_<ContainerAllocator> >
{
  static const char* value()
  {
    return "aviot_srvs/ResetFenceResponse";
  }

  static const char* value(const ::aviot_srvs::ResetFenceResponse_<ContainerAllocator>&) { return value(); }
};

template<class ContainerAllocator>
struct Definition< ::aviot_srvs::ResetFenceResponse_<ContainerAllocator> >
{
  static const char* value()
  {
    return "uint8 done\n\
\n\
";
  }

  static const char* value(const ::aviot_srvs::ResetFenceResponse_<ContainerAllocator>&) { return value(); }
};

} // namespace message_traits
} // namespace ros

namespace ros
{
namespace serialization
{

  template<class ContainerAllocator> struct Serializer< ::aviot_srvs::ResetFenceResponse_<ContainerAllocator> >
  {
    template<typename Stream, typename T> inline static void allInOne(Stream& stream, T m)
    {
      stream.next(m.done);
    }

    ROS_DECLARE_ALLINONE_SERIALIZER
  }; // struct ResetFenceResponse_

} // namespace serialization
} // namespace ros

namespace ros
{
namespace message_operations
{

template<class ContainerAllocator>
struct Printer< ::aviot_srvs::ResetFenceResponse_<ContainerAllocator> >
{
  template<typename Stream> static void stream(Stream& s, const std::string& indent, const ::aviot_srvs::ResetFenceResponse_<ContainerAllocator>& v)
  {
    s << indent << "done: ";
    Printer<uint8_t>::stream(s, indent + "  ", v.done);
  }
};

} // namespace message_operations
} // namespace ros

#endif // AVIOT_SRVS_MESSAGE_RESETFENCERESPONSE_H