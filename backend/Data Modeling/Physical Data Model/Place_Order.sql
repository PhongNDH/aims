use aims;

/*
CREATE USER 'aims_host'@'localhost' IDENTIFIED BY '123456';
GRANT ALL PRIVILEGES ON *.* TO 'aims_host'@'localhost' WITH GRANT OPTION;
CREATE USER 'aims_host'@'%' IDENTIFIED BY '123456';
GRANT ALL PRIVILEGES ON *.* TO 'aims_host'@'%' WITH GRANT OPTION;
FLUSH PRIVILEGES;
*/
#show databases;
#create database aims;

create table user(
                     id int not null auto_increment,
                     password text,
                     username varchar(1000),
                     email varchar(100),
                     role varchar(100),
                     primary key(id)
);

create table product (
                         id int not null auto_increment,
                         title varchar(100) not null,
                         price int not null,
                         category varchar(50) not null,
                         image_url text,
                         quantity int,
                         entry_date date,
                         dimension float,
                         weight float,
                         seller_id int,
                         primary key (id),
                         foreign key (seller_id) references user(id)
);


create table books(
                      id int not null,
                      author varchar(255),
                      publisher varchar(255),
                      cover_type varchar(255),
                      publication_date date,
                      pages int,
                      language varchar(255),
                      primary key(id),
                      foreign key (id) references product(id)
);


create table dvds(
                     id int not null,
                     disc_type varchar(255),
                     director varchar(255),
                     runtime time,
                     studio varchar(255),
                     language varchar(255),
                     subtitles text,
                     release_date date,
                     primary key(id),
                     foreign key (id) references product(id)
);

create table cdlps(
                      id int not null,
                      artist varchar(100),
                      record_label varchar(255),
                      track_list varchar(255),
                      primary key(id),
                      foreign key (id) references product(id)
);


create table delivery_info(
                              id int not null auto_increment,
                              name varchar(50),
                              phone varchar(15),
                              address varchar(1000),
                              province varchar(50),
                              instruction varchar(1000),
                              user_id int,
                              primary key(id),
                              foreign key (user_id) references user(id)
);

create table shipping_method(
                                id int auto_increment,
                                name varchar(200),
                                shipping_fee double,
                                primary key (id)
);

create table order_media (
                             id int not null auto_increment,
                             delivery_info_id int,
                             shipping_fees double,
                             total_amount double,
                             user_id int,
                             placed_date date,
                             created_at time,
                             shipping_method_id int,
                             VAT int,
                             total_fee double,
                             start_time time,
                             end_time time,
                             is_payment bool default false,
                             primary key (id),
                             foreign key (shipping_method_id) references shipping_method(id),
                             foreign key (delivery_info_id) references delivery_info(id),
                             foreign key (user_id) references user(id)
);

create table order_product (
                               id int not null auto_increment,
                               product_id int not null,
                               quantity int not null,
                               price int not null,
                               order_id int,
                               primary key (id),
                               foreign key (product_id) references product(id)
);

create table transaction_info (
                                  id int not null auto_increment,
                                  order_id int,
                                  total_amount double,
                                  status varchar(50),
                                  payment_method varchar(50),
                                  time time,
                                  date date,
                                  content varchar(300),
                                  primary key (id),
                                  foreign key (order_id) references order_media(id)
);

insert into shipping_method(name, shipping_fee) values ('Regular', 25000);
insert into shipping_method(name, shipping_fee) values ('Rush', 0);




