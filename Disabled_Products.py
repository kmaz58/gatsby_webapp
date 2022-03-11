# -*- coding: utf-8 -*-

from PySide2.QtCore import *
from PySide2.QtGui import *
from PySide2.QtWidgets import *
from xml.etree import ElementTree
import csv
import requests
import os
import xlsxwriter
from requests.auth import HTTPBasicAuth
from bs4 import BeautifulSoup


class Ui_Dialog(object):
    def setupUi(self, Dialog):
        if not Dialog.objectName():
            Dialog.setObjectName(u"Dialog")
        Dialog.resize(323, 196)
        Dialog.setMinimumSize(QSize(323, 196))
        Dialog.setMaximumSize(QSize(323, 196))

        self.comboBox = QComboBox(Dialog)
        self.comboBox.addItem("")
        self.comboBox.addItem("")
        self.comboBox.addItem("")
        self.comboBox.addItem("")
        self.comboBox.addItem("")
        self.comboBox.addItem("")
        self.comboBox.addItem("")
        self.comboBox.setObjectName(u"comboBox")
        self.comboBox.setGeometry(QRect(50, 70, 101, 22))

        self.pushButton = QPushButton(Dialog)
        self.pushButton.setObjectName(u"pushButton")
        self.pushButton.setGeometry(QRect(190, 70, 95, 23))
        self.pushButton.clicked.connect(self.getcsv)

        #self.progressBar = QProgressBar(Dialog)
        #self.progressBar.setObjectName(u"progressBar")
        #self.progressBar.setGeometry(QRect(50, 140, 221, 23))
        


        self.retranslateUi(Dialog)

        QMetaObject.connectSlotsByName(Dialog)
    # setupUi

    def retranslateUi(self, Dialog):
        Dialog.setWindowTitle(QCoreApplication.translate("Dialog", u"Disabled Products", None))
        self.comboBox.setItemText(0, QCoreApplication.translate("Dialog", u"DAS HOME", None))
        self.comboBox.setItemText(1, QCoreApplication.translate("Dialog", u"BABY OLIVER", None))
        self.comboBox.setItemText(2, QCoreApplication.translate("Dialog", u"LORELLI", None))
        self.comboBox.setItemText(3, QCoreApplication.translate("Dialog", u"KIKKA BOO", None))
        self.comboBox.setItemText(4, QCoreApplication.translate("Dialog", u"BEBESTARS", None))
        self.comboBox.setItemText(5, QCoreApplication.translate("Dialog", u"CANGAROO", None))
        self.comboBox.setItemText(6, QCoreApplication.translate("Dialog", u"DIMCOL", None))

        self.pushButton.setText(QCoreApplication.translate("Dialog", u"Create Report", None))
    # retranslateUi


    def getcsv(self,i):
         print(self.comboBox.currentText())
         if (self.comboBox.currentText()=="DAS HOME"):
            self.dashome()
         elif (self.comboBox.currentText()=="BABY OLIVER"):
            self.babyoliver()
         elif (self.comboBox.currentText()=="LORELLI"):
            self.lorelli()   
         elif (self.comboBox.currentText()=="KIKKA BOO"):
            self.kikkaboo()
         elif (self.comboBox.currentText()=="BEBESTARS"):
            self.bebestars()
         elif (self.comboBox.currentText()=="CANGAROO"):
            self.cangaroo()
         elif (self.comboBox.currentText()=="DIMCOL"):
            self.dimcol()
         else:
            error_msg=QMessageBox(QMessageBox.Critical,"Error","Error",QMessageBox.Ok)
            error_msg.exec()


    def dashome(self):
      try:
         URL = "https://www.dashome.gr/wp-load.php?security_token=dashome_xml"

         response = requests.get(URL)

         with open('tmp_dashome.xml', 'wb') as file:
            file.write(response.content)

         # PARSE XML
         xml = ElementTree.parse('tmp_dashome.xml')

         # CREATE CSV FILE
         csvfile = open("./output/dashome.csv",'w',encoding='utf-8',newline="")
         csvfile_writer = csv.writer(csvfile)

         # ADD THE HEADER TO CSV FILE
         csvfile_writer.writerow(["mpn","stock_status","brand"])

         # FOR EACH PRODUCT
         for product in xml.findall("item"):
            
            if(product):
               
               # EXTRACT PRODUCT DETAILS  
               brand = product.find("brand")
               mpn = product.find("mpn")
               stock_status = product.find("stock_status")
               if (stock_status.text == "outofstock"):
                  csv_line = [mpn.text,stock_status.text,brand.text]
                  csvfile_writer.writerow(csv_line)

         #os.remove('tmp_dashome.xml')
         success_msg=QMessageBox(QMessageBox.Information,"Info","Success",QMessageBox.Ok)
         success_msg.exec()
      except Exception as e:
         error_msg=QMessageBox(QMessageBox.Critical,"Error","Error: "+str(e),QMessageBox.Ok)
         error_msg.exec()

    def babyoliver(self):
      try:
         URL = "https://www.omegahome.gr/module/xmlfeeds/api?id=8&affiliate=affiliate_name"

         response = requests.get(URL)

         with open('tmp_babyoliver.xml', 'wb') as file:
            file.write(response.content)

         root = ElementTree.parse('tmp_babyoliver.xml')

         workbook = xlsxwriter.Workbook('./output/babyoliver.xlsx')
         babyoliver_worksheet = workbook.add_worksheet('babyoliver')

         list=[]
         row = 0
         col = 0

         babyoliver_worksheet.write(row, col, "mpn")
         babyoliver_worksheet.write(row, col + 1, "availability")

         row = 1
         col = 0

         for product in root.findall("product"):

            if(product):
               
               sku = product.find("mpn")
               instock = product.find("availability")

               if (instock.text == "Ν/Α - Contact us"):
                     csv_line = [sku.text, instock.text]
                     list.append(csv_line)
         os.remove('tmp_babyoliver.xml')

         for sku, instock in (list):
            babyoliver_worksheet.write(row, col,sku)
            babyoliver_worksheet.write(row, col + 1, instock)
            row += 1

         workbook.close()
         success_msg=QMessageBox(QMessageBox.Information,"Info","Success",QMessageBox.Ok)
         success_msg.exec()
      except Exception as e:
         error_msg=QMessageBox(QMessageBox.Critical,"Error","Error: "+str(e),QMessageBox.Ok)
         error_msg.exec()


    
    def lorelli(self):
      try:
         r = requests.get("https://lorelli.eu/ExportRssXmlFeed.aspx?token=d936ef91-f0bd-428d-9a6c-ab84b262c594&lang=en-bg")

         with open("tmp_lorelli_soup.txt", mode='wb') as localfile:     
            localfile.write(r.content)

         soup = BeautifulSoup(r.content, features='xml')
            

         csvfile = open("./output/lorelli.csv",'w',encoding='utf-8',newline="")
         csvfile_writer = csv.writer(csvfile)
         csvfile_writer.writerow(["id","availability"])

         products = soup.findAll('item')   

         for product in products:
            id = product.find('id').text
            availability = product.find('availability').text
            if (availability ==  "out of stock"):
               csv_line = [id,availability]
               csvfile_writer.writerow(csv_line)
         success_msg=QMessageBox(QMessageBox.Information,"Info","Success",QMessageBox.Ok)
         success_msg.exec()
      except Exception as e:
         error_msg=QMessageBox(QMessageBox.Critical,"Error","Error: "+str(e),QMessageBox.Ok)
         error_msg.exec()


    def kikkaboo(self):
      try:
         URL = "https://kikkaboo-b2b.com/media/feed/products.xml"

         response = requests.get(URL,auth = HTTPBasicAuth('kikkaboob2b', 'RVEqfj>R&3SPh{*r'))

         with open('tmp_kikkaboo.xml', 'wb') as file:
            file.write(response.content)

         # PARSE XML
         xml = ElementTree.parse('tmp_kikkaboo.xml')

         # CREATE CSV FILE
         csvfile = open("./output/kikkaboo.csv",'w',encoding='utf-8',newline="")
         csvfile_writer = csv.writer(csvfile)

         # ADD THE HEADER TO CSV FILE
         csvfile_writer.writerow(["sku","stock_status"])

         # FOR EACH PRODUCT
         for product in xml.findall("product"):
            
            if(product):
               
               # EXTRACT PRODUCT DETAILS  
               sku = product.find("SKU")
               availability = product.find("STOCK_STATUS")
               if (availability.text == "out of stock"):
                  csv_line = [sku.text, availability.text]
                  csvfile_writer.writerow(csv_line)

         #os.remove('tmp_kikkaboo.xml')
         success_msg=QMessageBox(QMessageBox.Information,"Info","Success",QMessageBox.Ok)
         success_msg.exec()
      except Exception as e:
         error_msg=QMessageBox(QMessageBox.Critical,"Error","Error: "+str(e),QMessageBox.Ok)
         error_msg.exec()


    def bebestars(self):
      try:
         URL = "https://b2b.bebestars.gr/wp-content/uploads/woo-product-feed-pro/xml/mP6FhRdW4uVcMydTqs0P6AI7g95nlck8.xml"

         response = requests.get(URL)

         with open('tmp_bebe_stars.xml', 'wb') as file:
            file.write(response.content)

         # PARSE XML
         xml = ElementTree.parse('tmp_bebe_stars.xml')

         # CREATE CSV FILE
         csvfile = open("./output/bebe_stars.csv",'w',encoding='utf-8',newline="")
         csvfile_writer = csv.writer(csvfile)

         # ADD THE HEADER TO CSV FILE
         csvfile_writer.writerow(["id","availability"])

         # FOR EACH PRODUCT
         for product in xml.findall("product"):
            
            if(product):
               
               # EXTRACT PRODUCT DETAILS  
               id = product.find("id")
               availability = product.find("availability")
               print(availability.text)
               print(float(availability.text))
               if (float(availability.text) <=0):
                  csv_line = [id.text, availability.text]
                  csvfile_writer.writerow(csv_line)

         os.remove('tmp_bebe_stars.xml')
         success_msg=QMessageBox(QMessageBox.Information,"Info","Success",QMessageBox.Ok)
         success_msg.exec()
      except Exception as e:
         error_msg=QMessageBox(QMessageBox.Critical,"Error","Error: "+str(e),QMessageBox.Ok)
         error_msg.exec()
      

    def cangaroo(self):
      print("start")
      try:
            URL = "https://monib2b.com/index.php?route=export/export&limit=0,3217&accesskey=22_fxlPXnlwsbnfV5B"

            response = requests.get(URL)
         
            with open('tmp_cangaroo.xml', 'wb') as file:
               file.write(response.content)

            # PARSE XML
            xml = ElementTree.parse('tmp_cangaroo.xml')

            # CREATE CSV FILE
            csvfile = open("./output/cangaroo.csv",'w',encoding='utf-8',newline="")
            csvfile_writer = csv.writer(csvfile)

            # ADD THE HEADER TO CSV FILE
            csvfile_writer.writerow(["Barcode","SKU","Quantity","Manufacturer"])

            # FOR EACH PRODUCT
            for product in xml.findall("product"):
               if(product):
                  
                  # EXTRACT PRODUCT DETAILS  
                  barcode = product.find("Barcode")
                  sku = product.find("SKU")
                  quantity = product.find("Quantity")
                  manufacturer = product.find("Manufacturer")
                  if (quantity.text == "Not Available"):
                     csv_line = [barcode.text, sku.text, quantity.text, manufacturer.text]
                     csvfile_writer.writerow(csv_line)

            #os.remove('tmp_cangaroo.xml')
            success_msg=QMessageBox(QMessageBox.Information,"Info","Success",QMessageBox.Ok)
            success_msg.exec()
      except Exception as e:
            error_msg=QMessageBox(QMessageBox.Critical,"Error","Error: "+str(e),QMessageBox.Ok)
            error_msg.exec()


    def dimcol(self):
      #print("start")
      try:
         URL = "https://www.dimcol.gr/files/exportimport/products.xml?fbclid=IwAR3Odb7aaQGBmwDIDCPjWSXkBritGm7oCbFf9Ps9QodXZMF8Nyku_aP0UrU"

         response = requests.get(URL)

         with open('tmp_dimcol.xml', 'wb') as file:
            file.write(response.content)

         root = ElementTree.parse('tmp_dimcol.xml')

         workbook = xlsxwriter.Workbook('./output/dimcol.xlsx')
         dimcol_worksheet = workbook.add_worksheet('dimcol')

         list=[]
         row = 0
         col = 0

         dimcol_worksheet.write(row, col, "sku")
         dimcol_worksheet.write(row, col + 1, "instock")

         row = 1
         col = 0

         for product in root.findall("Products/Product"):

            if(product):
               
               sku = product.find("SKU")
               instock = product.find("instock")

               if (instock.text == "Μη Διαθέσιμο" ):
                     csv_line = [sku.text, instock.text]
                     list.append(csv_line)
         os.remove('tmp_dimcol.xml')

         for sku, instock in (list):
            dimcol_worksheet.write(row, col,     sku)
            dimcol_worksheet.write(row, col + 1, instock)
            row += 1

         workbook.close()
         success_msg=QMessageBox(QMessageBox.Information,"Info","Success",QMessageBox.Ok)
         success_msg.exec()
      except Exception as e:
         error_msg=QMessageBox(QMessageBox.Critical,"Error","Error: "+str(e),QMessageBox.Ok)
         error_msg.exec()




if __name__ == "__main__":
    import sys
    app = QApplication(sys.argv)
    Form = QWidget()
    ui = Ui_Dialog()
    ui.setupUi(Form)
    Form.show()   
    sys.exit(app.exec_())
