#! /bin/bash   
# cache释放：   
# To free pagecache:   
sync   
sync   
#echo 1 > /proc/sys/vm/drop_caches   
# To free dentries and inodes:   
#echo 2 > /proc/sys/vm/drop_caches   
# To free pagecache, dentries and inodes:   
echo 3 > /proc/sys/vm/drop_caches  