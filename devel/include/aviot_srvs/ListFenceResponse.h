// Generated by gencpp from file aviot_srvs/ListFenceResponse.msg
// DO NOT EDIT!


#ifndef AVIOT_SRVS_MESSAGE_LISTFENCERESPONSE_H
#define AVIOT_SRVS_MESSAGE_LISTFENCERESPONSE_H


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
struct ListFenceResponse_
{
  typedef ListFenceResponse_<ContainerAllocator> Type;

  ListFenceResponse_()
    : polygon_ids()  {
    }
  ListFenceResponse_(const ContainerAllocator& _alloc)
    : polygon_ids(_alloc)  {
  (void)_alloc;
    }



   typedef std::vector<int32_t, typename ContainerAllocator::template rebind<int32_t>::other >  _polygon_ids_type;
  _polygon_ids_type polygon_ids;





  typedef boost::shared_ptr< ::aviot_srvs::ListFenceResponse_<ContainerAllocator> > Ptr;
  typedef boost::shared_ptr< ::aviot_srvs::ListFenceResponse_<ContainerAllocator> const> ConstPtr;

}; // struct ListFenceResponse_

typedef ::aviot_srvs::ListFenceResponse_<std::allocator<void> > ListFenceResponse;

typedef boost::shared_ptr< ::aviot_srvs::ListFenceResponse > ListFenceResponsePtr;
typedef boost::shared_ptr< ::aviot_srvs::ListFenceResponse const> ListFenceResponseConstPtr;

// constants requiring out of line definition



template<typename ContainerAllocator>
std::ostream& operator<<(std::ostream& s, const ::aviot_srvs::ListFenceResponse_<ContainerAllocator> & v)
{
ros::message_operations::Printer< ::aviot_srvs::ListFenceResponse_<ContainerAllocator> >::stream(s, "", v);
return s;
}

} // namespace aviot_srvs

namespace ros
{
namespace message_traits
{



// BOOLTRAITS {'IsFixedSize': False, 'IsMessage': True, 'HasHeader': False}
// {'std_msgs': ['/opt/ros/kinetic/share/std_msgs/cmake/../msg'], 'geometry_msgs': ['/opt/ros/kinetic/share/geometry_msgs/cmake/../msg']}

// !!!!!!!!!!! ['__class__', '__delattr__', '__dict__', '__doc__', '__eq__', '__format__', '__getattribute__', '__hash__', '__init__', '__module__', '__ne__', '__new__', '__reduce__', '__reduce_ex__', '__repr__', '__setattr__', '__sizeof__', '__str__', '__subclasshook__', '__weakref__', '_parsed_fields', 'constants', 'fields', 'full_name', 'has_header', 'header_present', 'names', 'package', 'parsed_fields', 'short_name', 'text', 'types']




template <class ContainerAllocator>
struct IsFixedSize< ::aviot_srvs::ListFenceResponse_<ContainerAllocator> >
  : FalseType
  { };

template <class ContainerAllocator>
struct IsFixedSize< ::aviot_srvs::ListFenceResponse_<ContainerAllocator> const>
  : FalseType
  { };

template <class ContainerAllocator>
struct IsMessage< ::aviot_srvs::ListFenceResponse_<ContainerAllocator> >
  : TrueType
  { };

template <class ContainerAllocator>
struct IsMessage< ::aviot_srvs::ListFenceResponse_<ContainerAllocator> const>
  : TrueType
  { };

template <class ContainerAllocator>
struct HasHeader< ::aviot_srvs::ListFenceResponse_<ContainerAllocator> >
  : FalseType
  { };

template <class ContainerAllocator>
struct HasHeader< ::aviot_srvs::ListFenceResponse_<ContainerAllocator> const>
  : FalseType
  { };


template<class ContainerAllocator>
struct MD5Sum< ::aviot_srvs::ListFenceResponse_<ContainerAllocator> >
{
  static const char* value()
  {
    return "f34d918e24ff52b99229c78d4dfce377";
  }

  static const char* value(const ::aviot_srvs::ListFenceResponse_<ContainerAllocator>&) { return value(); }
  static const uint64_t static_value1 = 0xf34d918e24ff52b9ULL;
  static const uint64_t static_value2 = 0x9229c78d4dfce377ULL;
};

template<class ContainerAllocator>
struct DataType< ::aviot_srvs::ListFenceResponse_<ContainerAllocator> >
{
  static const char* value()
  {
    return "aviot_srvs/ListFenceResponse";
  }

  static const char* value(const ::aviot_srvs::ListFenceResponse_<ContainerAllocator>&) { return value(); }
};

template<class ContainerAllocator>
struct Definition< ::aviot_srvs::ListFenceResponse_<ContainerAllocator> >
{
  static const char* value()
  {
    return "int32[] polygon_ids\n\
\n\
";
  }

  static const char* value(const ::aviot_srvs::ListFenceResponse_<ContainerAllocator>&) { return value(); }
};

} // namespace message_traits
} // namespace ros

namespace ros
{
namespace serialization
{

  template<class ContainerAllocator> struct Serializer< ::aviot_srvs::ListFenceResponse_<ContainerAllocator> >
  {
    template<typename Stream, typename T> inline static void allInOne(Stream& stream, T m)
    {
      stream.next(m.polygon_ids);
    }

    ROS_DECLARE_ALLINONE_SERIALIZER
  }; // struct ListFenceResponse_

} // namespace serialization
} // namespace ros

namespace ros
{
namespace message_operations
{

template<class ContainerAllocator>
struct Printer< ::aviot_srvs::ListFenceResponse_<ContainerAllocator> >
{
  template<typename Stream> static void stream(Stream& s, const std::string& indent, const ::aviot_srvs::ListFenceResponse_<ContainerAllocator>& v)
  {
    s << indent << "polygon_ids[]" << std::endl;
    for (size_t i = 0; i < v.polygon_ids.size(); ++i)
    {
      s << indent << "  polygon_ids[" << i << "]: ";
      Printer<int32_t>::stream(s, indent + "  ", v.polygon_ids[i]);
    }
  }
};

} // namespace message_operations
} // namespace ros

#endif // AVIOT_SRVS_MESSAGE_LISTFENCERESPONSE_H
