PGDMP  '                	    |            teltonika_baru    16.4    16.4 F    1           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            2           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            3           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            4           1262    16728    teltonika_baru    DATABASE     �   CREATE DATABASE teltonika_baru WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_Indonesia.1252';
    DROP DATABASE teltonika_baru;
                postgres    false            �            1255    16933    log_alat_changes()    FUNCTION       CREATE FUNCTION public.log_alat_changes() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    -- Log insert operation
    IF (TG_OP = 'INSERT') THEN
        INSERT INTO RIWAYAT (ROUTE_ID, ID_ALAT, IMEI, ID_SEWA, NAMA_ALAT, STATUSALAT2, SUHU2, LOG_LATITUDE, LOG_LONGITUDE, TIMESTAMPLOG, ACTION_TYPE_FROM_ALAT)
        SELECT 
			PERJALANAN.route_id,
			NEW.id_alat,
			NEW.imei,
			NEW.id_sewa,
			NEW.namaalat,
			NEW.statusalat,
			NEW.suhu,
			NEW.latitude,
			NEW.longitude,
			CURRENT_TIMESTAMP,
			'INSERT'
		FROM ALAT INNER JOIN SEWA ON ALAT.ID_SEWA = SEWA.ID_SEWA INNER JOIN PERJALANAN ON SEWA.ID_SEWA = PERJALANAN.ID_SEWA WHERE SEWA.ID_SEWA = PERJALANAN.ID_SEWA;
        RETURN NEW;
    -- Log update operation
    ELSIF (TG_OP = 'UPDATE') THEN
        INSERT INTO RIWAYAT (ROUTE_ID, ID_ALAT, IMEI, ID_SEWA, NAMA_ALAT, STATUSALAT2, SUHU2, LOG_LATITUDE, LOG_LONGITUDE, TIMESTAMPLOG, ACTION_TYPE_FROM_ALAT)
        SELECT 
			PERJALANAN.route_id,
			NEW.id_alat,
			NEW.imei,
			NEW.id_sewa,
			NEW.namaalat,
			NEW.statusalat,
			NEW.suhu,
			NEW.latitude,
			NEW.longitude,
			CURRENT_TIMESTAMP,
			'UPDATE'
		FROM ALAT INNER JOIN SEWA ON ALAT.ID_SEWA = SEWA.ID_SEWA INNER JOIN PERJALANAN ON SEWA.ID_SEWA = PERJALANAN.ID_SEWA WHERE SEWA.ID_SEWA = PERJALANAN.ID_SEWA;
        RETURN NEW;
    -- Log delete operation
    ELSIF (TG_OP = 'DELETE') THEN
        INSERT INTO riwayat (alat_id, alat_name, alat_type, suhu, action_type)
        VALUES (OLD.alat_id, OLD.alat_name, OLD.alat_type, OLD.suhu, 'DELETE');
        RETURN OLD;
    END IF;
END;
$$;
 )   DROP FUNCTION public.log_alat_changes();
       public          postgres    false            �            1259    16759    admin    TABLE     �   CREATE TABLE public.admin (
    id_admin integer NOT NULL,
    namaadmin character varying(50) NOT NULL,
    passwordadmin character varying(50) NOT NULL,
    kontakadmin character varying(15)
);
    DROP TABLE public.admin;
       public         heap    postgres    false            �            1259    16758    admin_id_admin_seq    SEQUENCE     �   CREATE SEQUENCE public.admin_id_admin_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.admin_id_admin_seq;
       public          postgres    false    216            5           0    0    admin_id_admin_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.admin_id_admin_seq OWNED BY public.admin.id_admin;
          public          postgres    false    215            �            1259    16790    alat    TABLE       CREATE TABLE public.alat (
    id_alat integer NOT NULL,
    imei character varying(20) NOT NULL,
    id_sewa integer,
    namaalat character varying(50),
    statusalat character varying(10),
    latitude numeric(8,6),
    longitude numeric(9,6),
    suhu numeric
);
    DROP TABLE public.alat;
       public         heap    postgres    false            �            1259    16789    alat_id_alat_seq    SEQUENCE     �   CREATE SEQUENCE public.alat_id_alat_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.alat_id_alat_seq;
       public          postgres    false    222            6           0    0    alat_id_alat_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.alat_id_alat_seq OWNED BY public.alat.id_alat;
          public          postgres    false    221            �            1259    16766    client    TABLE     �  CREATE TABLE public.client (
    id_client integer NOT NULL,
    id_admin integer NOT NULL,
    namaclient character varying(50) NOT NULL,
    password_client character varying(50) NOT NULL,
    kontakclient character varying(50),
    email character varying(50),
    jalan character varying(50),
    kecamatan character varying(50),
    kabupaten character varying(50),
    provinsi character varying(50)
);
    DROP TABLE public.client;
       public         heap    postgres    false            �            1259    16765    client_id_client_seq    SEQUENCE     �   CREATE SEQUENCE public.client_id_client_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.client_id_client_seq;
       public          postgres    false    218            7           0    0    client_id_client_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.client_id_client_seq OWNED BY public.client.id_client;
          public          postgres    false    217            �            1259    16816 	   commodity    TABLE     �   CREATE TABLE public.commodity (
    id_commodity integer NOT NULL,
    route_id integer NOT NULL,
    namabarang character varying(50),
    descbarang character varying(100),
    beratbarang double precision
);
    DROP TABLE public.commodity;
       public         heap    postgres    false            �            1259    16815    commodity_id_commodity_seq    SEQUENCE     �   CREATE SEQUENCE public.commodity_id_commodity_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 1   DROP SEQUENCE public.commodity_id_commodity_seq;
       public          postgres    false    226            8           0    0    commodity_id_commodity_seq    SEQUENCE OWNED BY     Y   ALTER SEQUENCE public.commodity_id_commodity_seq OWNED BY public.commodity.id_commodity;
          public          postgres    false    225            �            1259    16804 
   perjalanan    TABLE     �   CREATE TABLE public.perjalanan (
    route_id integer NOT NULL,
    id_sewa integer NOT NULL,
    startlatitude numeric(8,6),
    startlongitude numeric(9,6),
    endlatitude numeric(8,6),
    endlongitude numeric(9,6)
);
    DROP TABLE public.perjalanan;
       public         heap    postgres    false            �            1259    16803    perjalanan_route_id_seq    SEQUENCE     �   CREATE SEQUENCE public.perjalanan_route_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.perjalanan_route_id_seq;
       public          postgres    false    224            9           0    0    perjalanan_route_id_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public.perjalanan_route_id_seq OWNED BY public.perjalanan.route_id;
          public          postgres    false    223            �            1259    17044    riwayat    TABLE     �  CREATE TABLE public.riwayat (
    route_id integer,
    id_alat integer NOT NULL,
    imei character varying(50),
    id_sewa integer NOT NULL,
    nama_alat character varying(50),
    statusalat2 character varying(10),
    suhu2 numeric,
    log_latitude numeric(8,6),
    log_longitude numeric(9,6),
    timestamplog timestamp without time zone,
    action_type_from_alat character varying(50)
);
    DROP TABLE public.riwayat;
       public         heap    postgres    false            �            1259    17042    riwayat_id_alat_seq    SEQUENCE     �   CREATE SEQUENCE public.riwayat_id_alat_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.riwayat_id_alat_seq;
       public          postgres    false    229            :           0    0    riwayat_id_alat_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.riwayat_id_alat_seq OWNED BY public.riwayat.id_alat;
          public          postgres    false    227            �            1259    17043    riwayat_id_sewa_seq    SEQUENCE     �   CREATE SEQUENCE public.riwayat_id_sewa_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.riwayat_id_sewa_seq;
       public          postgres    false    229            ;           0    0    riwayat_id_sewa_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.riwayat_id_sewa_seq OWNED BY public.riwayat.id_sewa;
          public          postgres    false    228            �            1259    16778    sewa    TABLE     �   CREATE TABLE public.sewa (
    id_sewa integer NOT NULL,
    id_client integer NOT NULL,
    imei character varying(20) NOT NULL,
    tanggalawalsewa date,
    tanggalakhirsewa date
);
    DROP TABLE public.sewa;
       public         heap    postgres    false            �            1259    16777    sewa_id_sewa_seq    SEQUENCE     �   CREATE SEQUENCE public.sewa_id_sewa_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.sewa_id_sewa_seq;
       public          postgres    false    220            <           0    0    sewa_id_sewa_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.sewa_id_sewa_seq OWNED BY public.sewa.id_sewa;
          public          postgres    false    219            p           2604    17061    admin id_admin    DEFAULT     p   ALTER TABLE ONLY public.admin ALTER COLUMN id_admin SET DEFAULT nextval('public.admin_id_admin_seq'::regclass);
 =   ALTER TABLE public.admin ALTER COLUMN id_admin DROP DEFAULT;
       public          postgres    false    215    216    216            s           2604    17062    alat id_alat    DEFAULT     l   ALTER TABLE ONLY public.alat ALTER COLUMN id_alat SET DEFAULT nextval('public.alat_id_alat_seq'::regclass);
 ;   ALTER TABLE public.alat ALTER COLUMN id_alat DROP DEFAULT;
       public          postgres    false    222    221    222            q           2604    17063    client id_client    DEFAULT     t   ALTER TABLE ONLY public.client ALTER COLUMN id_client SET DEFAULT nextval('public.client_id_client_seq'::regclass);
 ?   ALTER TABLE public.client ALTER COLUMN id_client DROP DEFAULT;
       public          postgres    false    218    217    218            u           2604    17064    commodity id_commodity    DEFAULT     �   ALTER TABLE ONLY public.commodity ALTER COLUMN id_commodity SET DEFAULT nextval('public.commodity_id_commodity_seq'::regclass);
 E   ALTER TABLE public.commodity ALTER COLUMN id_commodity DROP DEFAULT;
       public          postgres    false    226    225    226            t           2604    17065    perjalanan route_id    DEFAULT     z   ALTER TABLE ONLY public.perjalanan ALTER COLUMN route_id SET DEFAULT nextval('public.perjalanan_route_id_seq'::regclass);
 B   ALTER TABLE public.perjalanan ALTER COLUMN route_id DROP DEFAULT;
       public          postgres    false    223    224    224            v           2604    17066    riwayat id_alat    DEFAULT     r   ALTER TABLE ONLY public.riwayat ALTER COLUMN id_alat SET DEFAULT nextval('public.riwayat_id_alat_seq'::regclass);
 >   ALTER TABLE public.riwayat ALTER COLUMN id_alat DROP DEFAULT;
       public          postgres    false    229    227    229            w           2604    17067    riwayat id_sewa    DEFAULT     r   ALTER TABLE ONLY public.riwayat ALTER COLUMN id_sewa SET DEFAULT nextval('public.riwayat_id_sewa_seq'::regclass);
 >   ALTER TABLE public.riwayat ALTER COLUMN id_sewa DROP DEFAULT;
       public          postgres    false    229    228    229            r           2604    17068    sewa id_sewa    DEFAULT     l   ALTER TABLE ONLY public.sewa ALTER COLUMN id_sewa SET DEFAULT nextval('public.sewa_id_sewa_seq'::regclass);
 ;   ALTER TABLE public.sewa ALTER COLUMN id_sewa DROP DEFAULT;
       public          postgres    false    219    220    220            !          0    16759    admin 
   TABLE DATA           P   COPY public.admin (id_admin, namaadmin, passwordadmin, kontakadmin) FROM stdin;
    public          postgres    false    216   $X       '          0    16790    alat 
   TABLE DATA           g   COPY public.alat (id_alat, imei, id_sewa, namaalat, statusalat, latitude, longitude, suhu) FROM stdin;
    public          postgres    false    222   �X       #          0    16766    client 
   TABLE DATA           �   COPY public.client (id_client, id_admin, namaclient, password_client, kontakclient, email, jalan, kecamatan, kabupaten, provinsi) FROM stdin;
    public          postgres    false    218   HY       +          0    16816 	   commodity 
   TABLE DATA           `   COPY public.commodity (id_commodity, route_id, namabarang, descbarang, beratbarang) FROM stdin;
    public          postgres    false    226   9Z       )          0    16804 
   perjalanan 
   TABLE DATA           q   COPY public.perjalanan (route_id, id_sewa, startlatitude, startlongitude, endlatitude, endlongitude) FROM stdin;
    public          postgres    false    224   7[       .          0    17044    riwayat 
   TABLE DATA           �   COPY public.riwayat (route_id, id_alat, imei, id_sewa, nama_alat, statusalat2, suhu2, log_latitude, log_longitude, timestamplog, action_type_from_alat) FROM stdin;
    public          postgres    false    229   �[       %          0    16778    sewa 
   TABLE DATA           [   COPY public.sewa (id_sewa, id_client, imei, tanggalawalsewa, tanggalakhirsewa) FROM stdin;
    public          postgres    false    220   x]       =           0    0    admin_id_admin_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.admin_id_admin_seq', 5, true);
          public          postgres    false    215            >           0    0    alat_id_alat_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.alat_id_alat_seq', 46, true);
          public          postgres    false    221            ?           0    0    client_id_client_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.client_id_client_seq', 5, true);
          public          postgres    false    217            @           0    0    commodity_id_commodity_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public.commodity_id_commodity_seq', 15, true);
          public          postgres    false    225            A           0    0    perjalanan_route_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.perjalanan_route_id_seq', 15, true);
          public          postgres    false    223            B           0    0    riwayat_id_alat_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.riwayat_id_alat_seq', 1, false);
          public          postgres    false    227            C           0    0    riwayat_id_sewa_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.riwayat_id_sewa_seq', 1, false);
          public          postgres    false    228            D           0    0    sewa_id_sewa_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.sewa_id_sewa_seq', 10, true);
          public          postgres    false    219            y           2606    16764    admin pk_admin 
   CONSTRAINT     R   ALTER TABLE ONLY public.admin
    ADD CONSTRAINT pk_admin PRIMARY KEY (id_admin);
 8   ALTER TABLE ONLY public.admin DROP CONSTRAINT pk_admin;
       public            postgres    false    216            �           2606    16797    alat pk_alat 
   CONSTRAINT     L   ALTER TABLE ONLY public.alat
    ADD CONSTRAINT pk_alat PRIMARY KEY (imei);
 6   ALTER TABLE ONLY public.alat DROP CONSTRAINT pk_alat;
       public            postgres    false    222            |           2606    16771    client pk_client 
   CONSTRAINT     U   ALTER TABLE ONLY public.client
    ADD CONSTRAINT pk_client PRIMARY KEY (id_client);
 :   ALTER TABLE ONLY public.client DROP CONSTRAINT pk_client;
       public            postgres    false    218            �           2606    16821    commodity pk_commodity 
   CONSTRAINT     ^   ALTER TABLE ONLY public.commodity
    ADD CONSTRAINT pk_commodity PRIMARY KEY (id_commodity);
 @   ALTER TABLE ONLY public.commodity DROP CONSTRAINT pk_commodity;
       public            postgres    false    226            �           2606    16809    perjalanan pk_perjalanan 
   CONSTRAINT     \   ALTER TABLE ONLY public.perjalanan
    ADD CONSTRAINT pk_perjalanan PRIMARY KEY (route_id);
 B   ALTER TABLE ONLY public.perjalanan DROP CONSTRAINT pk_perjalanan;
       public            postgres    false    224            �           2606    16783    sewa pk_sewa 
   CONSTRAINT     O   ALTER TABLE ONLY public.sewa
    ADD CONSTRAINT pk_sewa PRIMARY KEY (id_sewa);
 6   ALTER TABLE ONLY public.sewa DROP CONSTRAINT pk_sewa;
       public            postgres    false    220            �           1259    16838    idx_alat_sewa    INDEX     A   CREATE INDEX idx_alat_sewa ON public.alat USING btree (id_sewa);
 !   DROP INDEX public.idx_alat_sewa;
       public            postgres    false    222            z           1259    16837    idx_client_admin    INDEX     G   CREATE INDEX idx_client_admin ON public.client USING btree (id_admin);
 $   DROP INDEX public.idx_client_admin;
       public            postgres    false    218            �           1259    16841    idx_perjalanan_sewa    INDEX     M   CREATE INDEX idx_perjalanan_sewa ON public.perjalanan USING btree (id_sewa);
 '   DROP INDEX public.idx_perjalanan_sewa;
       public            postgres    false    224            }           1259    16839    idx_sewa_client    INDEX     E   CREATE INDEX idx_sewa_client ON public.sewa USING btree (id_client);
 #   DROP INDEX public.idx_sewa_client;
       public            postgres    false    220            ~           1259    16840    idx_sewa_imei    INDEX     >   CREATE INDEX idx_sewa_imei ON public.sewa USING btree (imei);
 !   DROP INDEX public.idx_sewa_imei;
       public            postgres    false    220            �           2620    16934    alat log_alat_changes_trigger    TRIGGER     �   CREATE TRIGGER log_alat_changes_trigger AFTER INSERT OR DELETE OR UPDATE ON public.alat FOR EACH ROW EXECUTE FUNCTION public.log_alat_changes();
 6   DROP TRIGGER log_alat_changes_trigger ON public.alat;
       public          postgres    false    222    241            �           2606    16798    alat fk_alat_sewa    FK CONSTRAINT     �   ALTER TABLE ONLY public.alat
    ADD CONSTRAINT fk_alat_sewa FOREIGN KEY (id_sewa) REFERENCES public.sewa(id_sewa) ON UPDATE RESTRICT ON DELETE RESTRICT;
 ;   ALTER TABLE ONLY public.alat DROP CONSTRAINT fk_alat_sewa;
       public          postgres    false    4736    222    220            �           2606    16772    client fk_client_admin    FK CONSTRAINT     �   ALTER TABLE ONLY public.client
    ADD CONSTRAINT fk_client_admin FOREIGN KEY (id_admin) REFERENCES public.admin(id_admin) ON UPDATE RESTRICT ON DELETE RESTRICT;
 @   ALTER TABLE ONLY public.client DROP CONSTRAINT fk_client_admin;
       public          postgres    false    216    218    4729            �           2606    16822 !   commodity fk_commodity_perjalanan    FK CONSTRAINT     �   ALTER TABLE ONLY public.commodity
    ADD CONSTRAINT fk_commodity_perjalanan FOREIGN KEY (route_id) REFERENCES public.perjalanan(route_id) ON UPDATE RESTRICT ON DELETE RESTRICT;
 K   ALTER TABLE ONLY public.commodity DROP CONSTRAINT fk_commodity_perjalanan;
       public          postgres    false    4742    226    224            �           2606    16810    perjalanan fk_perjalanan_sewa    FK CONSTRAINT     �   ALTER TABLE ONLY public.perjalanan
    ADD CONSTRAINT fk_perjalanan_sewa FOREIGN KEY (id_sewa) REFERENCES public.sewa(id_sewa) ON UPDATE RESTRICT ON DELETE RESTRICT;
 G   ALTER TABLE ONLY public.perjalanan DROP CONSTRAINT fk_perjalanan_sewa;
       public          postgres    false    4736    220    224            �           2606    17056    riwayat fk_riwayat_alat    FK CONSTRAINT     �   ALTER TABLE ONLY public.riwayat
    ADD CONSTRAINT fk_riwayat_alat FOREIGN KEY (imei) REFERENCES public.alat(imei) ON DELETE CASCADE;
 A   ALTER TABLE ONLY public.riwayat DROP CONSTRAINT fk_riwayat_alat;
       public          postgres    false    222    4739    229            �           2606    17051    riwayat fk_riwayat_perjalanan    FK CONSTRAINT     �   ALTER TABLE ONLY public.riwayat
    ADD CONSTRAINT fk_riwayat_perjalanan FOREIGN KEY (route_id) REFERENCES public.perjalanan(route_id) ON DELETE CASCADE;
 G   ALTER TABLE ONLY public.riwayat DROP CONSTRAINT fk_riwayat_perjalanan;
       public          postgres    false    229    224    4742            �           2606    16784    sewa fk_sewa_client    FK CONSTRAINT     �   ALTER TABLE ONLY public.sewa
    ADD CONSTRAINT fk_sewa_client FOREIGN KEY (id_client) REFERENCES public.client(id_client) ON UPDATE RESTRICT ON DELETE RESTRICT;
 =   ALTER TABLE ONLY public.sewa DROP CONSTRAINT fk_sewa_client;
       public          postgres    false    220    4732    218            !   U   x�=�;
�@��zs�y�k�=l��``��O�~=�+��O����1ֹu(Y�Y�KF6r��R���l*ɥ� y�'�:���&u      '   �   x�M���0Eg�_�����`bda �*j�_�i���>�a,j��T�
��w]���p���.�����s;P�d
�DvSa�
d��u����.)��G˅�:T�؞)0�,&��AK<ɮ�np��א��	����5Y���������֠M���R��I�      #   �   x�e��j�0����)�&ڲܒ�V�6+$!��FTV���y��`�����9pX;k|�!�
��	�y�JOg�Ť;�ybY9���>]�l�k�L�%��d��5>��m}����ɚ������L� Ǝq�Z�	t�+� :H(|Pt�9�2��H���雩()"I���>B����ي8[��g�4���ęj���	z�|Q��H"��n)c��9��      +   �   x���=n�0�g��@ю��֢[� :u�m�,[�~�T=COV9@�	���@>�}x����$ߘ"�Po�^6<$9S�F��4�$C:&�$���3�Vk-*�`$?R�)��l������7.*T�ݢ�jQC�O?˽w]jc�S3��p�.?h&�j��|pϑ�4'�LqO����f$�RB��ӗs����OޡV���":�R:�":�EtP�ƃX���e��� �	�\!��m�      )   �   x����D1CϤ��0		�e���g���X�lz*��"HeG5�v��W'II�i��Pn�C?���1e��QZ)S�;��]�L�Yo�#����-v?�W�����TC.[ȥ�\���A��B>��<�D?�RzN�y-      .   �  x����n1E��W�֚�=vXAAI@XR�JQ�����}D]�-�5���s�Gc!W5�%j�"�����v=_>��/��7Y�4��</.�J�)���#˓����ӧ-jz=������!ҟ��H
�a��@��# )�Fh0��� 7j5JvS�"�J��u\1���H�W�h���u�#0�Q&@��t����@:��4Pj ��a�C�$�����KE�a��qt�8M<��L�$;[Ao� 4�?" I4�?��hxD$�� 04��KE�!�o�hs���n���TU��}Wzo� 4�?" I4�?��hxD$�� 0�Zd����7D�7��9�c�������b0J�cL��q��R�d��8 ��4�/��p`      %   v   x��ϻ�0E��q���.�C��Tw�O 5����e���bY�P��n*�zJ�_�$�A,�����{s�p�����E
*ä��Rd_�q�(���Eu�H�x��CD7HfK�     