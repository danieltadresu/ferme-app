/* DEBIESE DE SER LA TABLA Person
 	CREATE TABLE customer (
	id int NOT NULL,
	customer_rut varchar(11) NOT NULL,
	is_company int NOT NULL,
	customer_name varchar(255) NOT NULL,
	customer_location varchar(255) NOT NULL,
	customer_phone int NOT NULL,
	customer_email varchar(255) NOT NULL,
	commune_id int NOT NULL,
	user_id int NOT NULL,
	CONSTRAINT PK_customer PRIMARY KEY (ID),
	FOREIGN KEY (commune_id) REFERENCES commune(id),
	FOREIGN KEY (user_id) REFERENCES Users(id)
);
 */

/* COMPRA DEL CLIENTE */

/**
 * CREATE TABLE
 */

CREATE TABLE commune (
	id int NOT NULL,
	description varchar(255) NOT NULL,
	CONSTRAINT PK_Commune PRIMARY KEY (ID)
);

/**
 * INSERT ON TABLE COMMUNE
 */
INSERT INTO commune (id, description) VALUES(1, 'SANTIAGO');


CREATE TABLE Person (
    id int NOT NULL,
    last_name varchar(255) NOT NULL,
    first_name varchar(255),
    CONSTRAINT PK_Person PRIMARY KEY (ID)
);

ALTER TABLE Person ADD commune_id int NOT NULL CONSTRAINT FK_commune REFERENCES COMMUNE(id);


  
CREATE TABLE Roles (
    id int NOT NULL,
    name varchar(255) NOT NULL,
    description varchar(255) NULL,
    CONSTRAINT PK_Role PRIMARY KEY (ID)
);


CREATE TABLE Users (
    id int NOT NULL,
    email varchar(255) NOT NULL,
    password varchar(255),
    person_id int NOT NULL,
    CONSTRAINT PK_User PRIMARY KEY (ID),
    FOREIGN KEY (person_id) REFERENCES Person(id)
);


CREATE TABLE Users_Roles (
    id int NOT NULL,
    user_id int NOT NULL,
    role_id int NOT NULL,
    CONSTRAINT PK_User_Rol PRIMARY KEY (ID),
    FOREIGN KEY (user_id) REFERENCES Users(id),
    FOREIGN KEY (role_id) REFERENCES Roles(id)
);



INSERT INTO Person (id, last_name, first_name, commune_id) VALUES (1, 'JOHN', 'DOE', 1);
INSERT INTO Person (id, last_name, first_name, commune_id) VALUES (2, 'PEDRO', 'CAMPOS', 1);
INSERT INTO Person (id, last_name, first_name, commune_id) VALUES (3, 'MARIA', 'VENTO', 1);
INSERT INTO Roles (id, name) VALUES (1, 'ADMIN');
INSERT INTO Roles (id, name) VALUES (2, 'PROVIDER');
INSERT INTO Roles (id, name) VALUES (3, 'CUSTOMER');

INSERT INTO USERS (id, email, password, person_id) VALUES(1, 'danieldev1999@gmail.com', '123', 1);
INSERT INTO USERS (id, email, password, person_id) VALUES(2, 'da.pizarrot@duocuc.cl', '123', 2);
INSERT INTO USERS (id, email, password, person_id) VALUES(3, 'dpizarro@moveapps.cl', '123', 3);


INSERT INTO users_roles (id, user_id, role_id) VALUES (1, 1, 1);
INSERT INTO users_roles (id, user_id, role_id) VALUES (2, 2, 2);

INSERT INTO users_roles (id, user_id, role_id) VALUES (3, 3, 3);

DROP TABLE commune;
DROP TABLE USERS_ROLES ;
DROP TABLE roles;
DROP TABLE users;
DROP TABLE CUSTOMER_PURCHASE 
DROP TABLE person;
DROP TABLE product;
DROP TABLE PRODUCT_CATEGORY ;
DROP TABLE provider;





/* PRODUCTS */
CREATE TABLE Product_Category (
    id int NOT NULL,
    parent_category int NULL,
    name varchar(255) NOT NULL,
    description varchar(255) NOT NULL,
    CONSTRAINT PK_Product_Category PRIMARY KEY (ID)
);
INSERT INTO Product_Category (id, name, description) VALUES (1, 'MANUAL TOOLS', 'MANUAL TOOLS LIKE HAMMERS, NAILS AND OTHERS.');
INSERT INTO Product_Category (id, parent_category, name, description) VALUES (2, 1, 'HAMMER VPC-183', 'THE BEST HAMMER');


CREATE TABLE Provider (
    id int NOT NULL,
    name varchar(255) NOT NULL,
    CONSTRAINT PK_Provider PRIMARY KEY (ID)
);
INSERT INTO Provider (id, name) VALUES (1, 'GRANIDISCO');

CREATE TABLE Product (
    id int NOT NULL,
    name varchar(255) NOT NULL,
    description varchar(255) NOT NULL,
    createdat int NULL,
    updatedat int NULL,
    price int NOT NULL,
    stock int NOT NULL,
    image_url  varchar(3000) NULL,
    category_id int NOT NULL,
    provider_id int NOT NULL,
    CONSTRAINT PK_Product PRIMARY KEY (ID),
    FOREIGN KEY (category_id) REFERENCES Product_Category(id),
    FOREIGN KEY (provider_id) REFERENCES Provider(id)
);
INSERT INTO PRODUCT
(ID, NAME, DESCRIPTION, CREATEDAT, UPDATEDAT, PRICE, STOCK, IMAGE_URL, CATEGORY_ID, PROVIDER_ID)
VALUES(1, 'HAMMER', 'THE BEST HAMMER', 1621639796, 1621639796, 10000, 10, 'https://m.media-amazon.com/images/I/51Z-pyj1qjL._AC_SX522_.jpg', 2, 1);



DROP TABLE PRODUCT ;
DROP TABLE PRODUCT_CATEGORY ;
DROP TABLE PROVIDER ;








CREATE TABLE payment_method (
	id int NOT NULL,
	description varchar(255) NOT NULL,
	CONSTRAINT PK_Payment_method PRIMARY KEY (ID)
);
INSERT INTO PAYMENT_METHOD (id, description) VALUES (1, 'CREDIT CARD');

CREATE TABLE delivery_type (
	id int NOT NULL,
	description varchar(255) NOT NULL,
	CONSTRAINT PK_Delivery_type PRIMARY KEY (ID)
);

INSERT INTO delivery_type (id, description) VALUES (1, 'HOME DELIVERY');

CREATE TABLE customer_purchase (
	id int NOT NULL,
	product_quantity int NOT NULL,
	total_purchase int NOT NULL,
	payment_method_id int NOT NULL,
	delivery_type_id int NOT NULL,
	customer_id int NOT NULL,
	product_id int NOT NULL,
	CONSTRAINT PK_Customer_purchase PRIMARY KEY (ID)
	FOREIGN KEY (payment_method_id) REFERENCES payment_method(id),
	FOREIGN KEY (delivery_type_id) REFERENCES delivery_type(id),
	FOREIGN KEY (customer_id) REFERENCES person(id),
	FOREIGN KEY (product_id) REFERENCES product(id)
);



